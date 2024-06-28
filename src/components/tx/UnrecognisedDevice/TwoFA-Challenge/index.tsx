import { Button, CardActions, CircularProgress } from '@mui/material'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/system/Stack'
import { useState, type ReactElement } from 'react'
import InputOTP from './InputOTP'
import css from './styles.module.css'

import CloseIconDark from '@/public/images/transactions/icon-close-dark.svg'
import CloseIconLight from '@/public/images/transactions/icon-close-light.svg'

const TwoFA_Challenge = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(true)

  const [verificationCode, setVerificationCode] = useState<string>('')
  const [isVerificationInProgress, setIsVerificationInProgress] = useState<boolean>(false)
  const [isResendCodeInProgress, setIsResendCodeInProgress] = useState<boolean>(false)
  const [shouldResendCode, setShouldResendCode] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const theme = useTheme()
  const CloseIcon = theme.palette.mode === 'dark' ? CloseIconLight : CloseIconDark

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{
          '& > .MuiPaper-root': {
            top: '50% !important',
            left: '50% !important',
            transform: 'translate(-50%, -50%) !important',
          },
        }}
        transitionDuration={0}
      >
        <Paper className={css.popoverContainer}>
          <div className={css.popoverHeader}>
            <Typography variant="h4" component="span" fontWeight={700}>
              Safe {'{WALLET}'} | FailSafe
            </Typography>
            <span style={{ cursor: 'pointer' }}>
              <CloseIcon width={28} height={28} onClick={handleClose} />
            </span>
          </div>

          <div className={css.popoverFooter}>
            <Typography component="span">
              To proceed with this transaction or approval confirmation, we have sent a 6 digit code to your email:
            </Typography>
            <Typography component="span" fontWeight={700}>
              kan*****@getfailsafe.com
            </Typography>
            <div className={css.otpContainer}>
              <Typography component="span" fontWeight={700}>
                Verification Code
              </Typography>
              <div>
                <InputOTP
                  separator={<span>-</span>}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  length={5}
                />
              </div>
            </div>

            <CardActions sx={{ padding: 0 }}>
              <Stack
                sx={{
                  width: ['100%', '100%', '100%', '100%'],
                }}
                direction={{ xs: 'column-reverse', lg: 'row' }}
                useFlexGap={true}
                spacing={{ xs: 2, md: 2 }}
              >
                <Button
                  data-testid="resend-otp-btn"
                  variant="contained"
                  disabled={isResendCodeInProgress || isVerificationInProgress || !shouldResendCode}
                  type="submit"
                  sx={{
                    minWidth: '82px',
                    order: '1',
                    width: ['100%', '100%', '100%', 'auto'],
                    alignSelf: 'flex-start',
                  }}
                >
                  {isResendCodeInProgress ? <CircularProgress size={20} /> : 'Resend code (59s)'}
                </Button>
                <Button
                  data-testid="sign-btn"
                  variant="contained"
                  disabled={isResendCodeInProgress || isVerificationInProgress || shouldResendCode}
                  type="submit"
                  sx={{ minWidth: '82px', order: '1', width: ['100%', '100%', '100%', 'auto'], marginLeft: 'auto' }}
                >
                  {isVerificationInProgress ? <CircularProgress size={20} /> : 'Confirm'}
                </Button>
              </Stack>
            </CardActions>
          </div>
        </Paper>
      </Popover>
    </>
  )
}

export default TwoFA_Challenge
