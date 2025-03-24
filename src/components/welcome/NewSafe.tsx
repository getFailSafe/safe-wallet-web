import React from 'react'
import { Grid, SvgIcon, Typography } from '@mui/material'
import css from './styles.module.css'
import CheckFilled from '@/public/images/common/check-filled.svg'

import WelcomeLogin from './WelcomeLogin'

const BulletListItem = ({ text }: { text: string }) => (
  <li>
    <SvgIcon component={CheckFilled} inheritViewBox />
    <Typography color="white" fontWeight={700}>
      {text}
    </Typography>
  </li>
)

const NewSafe = () => {
  return (
    <>
      <Grid container spacing={3} p={3} pb={0} flex={1} direction="row-reverse">
        <Grid item xs={12} lg={6}>
          <WelcomeLogin />
        </Grid>
        <Grid item xs={12} lg={6} flex={1}>
          <div
            className={css.content}
            style={{
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(10px)',
              animation: 'none',
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(254, 251, 251, 0.15)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h1" fontSize={[44, null, 52]} lineHeight={1} letterSpacing={-1.5} color="white">
              Secure Your Digital Assets by
              <br />
              <span style={{ color: 'var(--color-secondary-main)' }}>Intelligent AI Co-Signer</span>
            </Typography>

            <Typography mb={1} color="white">
              The protective hand that shields your transactions. Our intelligent AI Co-Signer acts as a security
              gatekeeper with multi-layered access control.
            </Typography>

            <ul className={css.bulletList}>
              <BulletListItem text="Gnosis Safe Multisig with battle-tested infrastructure" />
              <BulletListItem text="IP-based access restrictions and geofencing" />
              <BulletListItem text="Time-based transaction constraints" />
              <BulletListItem text="Contract whitelisting for trusted destinations" />
              <BulletListItem text="AI-powered transaction analysis with 99.7% accuracy" />
              <BulletListItem text="Customizable security policies for any use case" />
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default NewSafe
