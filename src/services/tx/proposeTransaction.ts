import type { SafeTransaction } from '@safe-global/safe-core-sdk-types'
import type { Operation, TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk'
import { proposeTransaction } from '@safe-global/safe-gateway-typescript-sdk'
import UAParser from 'ua-parser-js'

const proposeTx = async (
  chainId: string,
  safeAddress: string,
  sender: string,
  tx: SafeTransaction,
  safeTxHash: string,
  origin?: any,
): Promise<TransactionDetails> => {
  const signatures = tx.signatures.size > 0 ? tx.encodedSignatures() : undefined

  // BEGIN: Device fingerprinting

  let uaParser = new UAParser()
  let parserResults = uaParser.getResult()
  const deviceFingerprint = {
    browser: parserResults.browser,
    os: parserResults.os,
    device: parserResults.device,
  }

  // END: Device fingerprinting

  // HACK: This is a workaround to add the device fingerprint to the origin object
  // The flow of fingerprint data is as follows:
  // Safe UI (Browser) -> Safe Client Gateway (API endpoint)
  // The fingerprint data will be removed from the origin object in the Safe Client Gateway after it verifies the device fingerprint

  if (origin != undefined && typeof origin === 'object') {
    origin['deviceFingerprint'] = deviceFingerprint
  } else if (origin != undefined && typeof origin === 'string') {
    origin = JSON.parse(origin)
    origin['deviceFingerprint'] = deviceFingerprint
  } else {
    origin = { deviceFingerprint }
  }

  origin = JSON.stringify(origin)

  // END: HACK

  return proposeTransaction(chainId, safeAddress, {
    ...tx.data,
    safeTxHash,
    sender,
    value: tx.data.value.toString(),
    operation: tx.data.operation as unknown as Operation,
    nonce: tx.data.nonce.toString(),
    safeTxGas: tx.data.safeTxGas.toString(),
    baseGas: tx.data.baseGas.toString(),
    gasPrice: tx.data.gasPrice.toString(),
    signature: signatures,
    origin,
  })
}

export default proposeTx
