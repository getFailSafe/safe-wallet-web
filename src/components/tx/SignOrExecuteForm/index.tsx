// core/safe-wallet-web/src/components/tx/SignOrExecuteForm/index.tsx

import { SafeTxContext } from '@/components/tx-flow/SafeTxProvider'
import TxCard from '@/components/tx-flow/common/TxCard'
import ConfirmationTitle, { ConfirmationTitleTypes } from '@/components/tx/SignOrExecuteForm/ConfirmationTitle'
import CounterfactualForm from '@/features/counterfactual/CounterfactualForm'
import useChainId from '@/hooks/useChainId'
import useDecodeTx from '@/hooks/useDecodeTx'
import useSafeInfo from '@/hooks/useSafeInfo'
import { trackEvent } from '@/services/analytics'
import { TX_EVENTS } from '@/services/analytics/events/transactions'
import { getTransactionTrackingType } from '@/services/analytics/tx-tracking'
import { isDelegateCall } from '@/services/tx/tx-sender/sdk'
import { useAppSelector } from '@/store'
import { selectSettings } from '@/store/settingsSlice'
import madProps from '@/utils/mad-props'
import { ErrorBoundary } from '@sentry/react'
import { useCallback, useContext, useState, type ReactElement, type ReactNode } from 'react'
import ApprovalEditor from '../ApprovalEditor'
import DecodedTx from '../DecodedTx'
import ErrorMessage from '../ErrorMessage'
import { WrongChainWarning } from '../WrongChainWarning'
import { RedefineBalanceChanges } from '../security/redefine/RedefineBalanceChange'
import ExecuteForm from './ExecuteForm'
import RiskConfirmationError from './RiskConfirmationError'
import SignForm from './SignForm'
import TxChecks from './TxChecks'
import UnknownContractError from './UnknownContractError'
import { useImmediatelyExecutable, useValidateNonce } from './hooks'

export type SubmitCallback = (txId: string, isExecuted?: boolean) => void

export type SignOrExecuteProps = {
  txId?: string
  onSubmit?: SubmitCallback
  children?: ReactNode
  isExecutable?: boolean
  isRejection?: boolean
  isBatch?: boolean
  isBatchable?: boolean
  onlyExecute?: boolean
  disableSubmit?: boolean
  origin?: string
  deviceFingerprint?: string
  isCreation?: boolean
  showToBlock?: boolean
}

const trackTxEvents = async (chainId: string, txId: string, isCreation: boolean, isExecuted: boolean) => {
  const event = isCreation ? TX_EVENTS.CREATE : isExecuted ? TX_EVENTS.EXECUTE : TX_EVENTS.CONFIRM
  const txType = await getTransactionTrackingType(chainId, txId)
  trackEvent({ ...event, label: txType })

  // Immediate execution on creation
  if (isCreation && isExecuted) {
    trackEvent({ ...TX_EVENTS.EXECUTE, label: txType })
  }
}

export const SignOrExecuteForm = ({
  chainId,
  safeTx,
  safeTxError,
  onSubmit,
  ...props
}: SignOrExecuteProps & {
  chainId: ReturnType<typeof useChainId>
  safeTx: ReturnType<typeof useSafeTx>
  safeTxError: ReturnType<typeof useSafeTxError>
}): ReactElement => {
  const { transactionExecution } = useAppSelector(selectSettings)
  const [shouldExecute] = useState<boolean>(transactionExecution)
  const isCreation = !props.txId
  const isNewExecutableTx = useImmediatelyExecutable() && isCreation
  const isCorrectNonce = useValidateNonce(safeTx)
  const [decodedData, decodedDataError, decodedDataLoading] = useDecodeTx(safeTx)
  const isBatchable = props.isBatchable !== false && safeTx && !isDelegateCall(safeTx)

  const { safe } = useSafeInfo()
  const isCounterfactualSafe = !safe.deployed

  // If checkbox is checked and the transaction is executable, execute it, otherwise sign it
  const canExecute = isCorrectNonce && (props.isExecutable || isNewExecutableTx)
  const willExecute = (props.onlyExecute || shouldExecute) && canExecute
  const optionalExecute = canExecute && !props.onlyExecute && !isCounterfactualSafe

  const onFormSubmit = useCallback<SubmitCallback>(
    async (txId, isExecuted = false) => {
      onSubmit?.(txId, isExecuted)

      // Track tx event
      trackTxEvents(chainId, txId, isCreation, isExecuted)
    },
    [chainId, isCreation, onSubmit],
  )

  return (
    <>
      <TxCard>
        {props.children}

        <ErrorBoundary fallback={<div>Error parsing data</div>}>
          <ApprovalEditor safeTransaction={safeTx} />
        </ErrorBoundary>

        <DecodedTx
          tx={safeTx}
          txId={props.txId}
          decodedData={decodedData}
          decodedDataError={decodedDataError}
          decodedDataLoading={decodedDataLoading}
          showMultisend={!props.isBatch}
          showToBlock={props.showToBlock}
        />

        {!isCounterfactualSafe && <RedefineBalanceChanges />}
      </TxCard>

      {!isCounterfactualSafe && (
        <TxCard>
          <TxChecks />
        </TxCard>
      )}

      <TxCard>
        <ConfirmationTitle
          variant={!optionalExecute && willExecute ? ConfirmationTitleTypes.execute : ConfirmationTitleTypes.sign}
          isCreation={isCreation}
        />

        {safeTxError && (
          <ErrorMessage error={safeTxError}>
            This transaction will most likely fail. To save gas costs, avoid confirming the transaction.
          </ErrorMessage>
        )}

        {/* {canExecute && !props.onlyExecute && !isCounterfactualSafe && <ExecuteCheckbox onChange={setShouldExecute} />} */}

        <WrongChainWarning />

        <UnknownContractError />

        <RiskConfirmationError />

        {isCounterfactualSafe ? (
          <CounterfactualForm {...props} safeTx={safeTx} isCreation={isCreation} onSubmit={onFormSubmit} onlyExecute />
        ) : !optionalExecute && willExecute ? (
          <ExecuteForm {...props} safeTx={safeTx} isCreation={isCreation} onSubmit={onFormSubmit} />
        ) : (
          <SignForm
            {...props}
            safeTx={safeTx}
            isBatchable={isBatchable}
            isCreation={isCreation}
            onSubmit={onFormSubmit}
          />
        )}
      </TxCard>
    </>
  )
}

const useSafeTx = () => useContext(SafeTxContext).safeTx
const useSafeTxError = () => useContext(SafeTxContext).safeTxError

export default madProps(SignOrExecuteForm, {
  chainId: useChainId,
  safeTx: useSafeTx,
  safeTxError: useSafeTxError,
})
