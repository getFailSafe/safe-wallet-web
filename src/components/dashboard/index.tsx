import FirstSteps from '@/components/dashboard/FirstSteps'
import useSafeInfo from '@/hooks/useSafeInfo'
import type { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, Typography, Box, Button, useTheme } from '@mui/material'
import PendingTxsList from '@/components/dashboard/PendingTxs/PendingTxsList'
import AssetsWidget from '@/components/dashboard/Assets'
import Overview from '@/components/dashboard/Overview/Overview'
import CreationDialog from '@/components/dashboard/CreationDialog'
import { useRouter } from 'next/router'
import { CREATION_MODAL_QUERY_PARM } from '../new-safe/create/logic'
import useRecovery from '@/features/recovery/hooks/useRecovery'
import { useIsRecoverySupported } from '@/features/recovery/hooks/useIsRecoverySupported'
import ActivityRewardsSection from '@/components/dashboard/ActivityRewardsSection'
import { useHasFeature } from '@/hooks/useChains'
import { FEATURES } from '@/utils/chains'
import css from './styles.module.css'
import SwapWidget from '@/features/swap/components/SwapWidget'
import SecurityIcon from '@mui/icons-material/Security'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PublicIcon from '@mui/icons-material/Public'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useGuardApp } from '@/hooks/useGuardApp'

const RecoveryHeader = dynamic(() => import('@/features/recovery/components/RecoveryHeader'))

// Co-Signer Widget Component
const GuardWidget = (): ReactElement => {
  const { openGuardApp } = useGuardApp()
  const { safe } = useSafeInfo()
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return (
    <Paper
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 14px 50px rgba(0, 0, 0, 0.15)',
        },
        cursor: 'pointer',
        width: '100%',
      }}
      onClick={openGuardApp}
    >
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}50)`
            : `linear-gradient(135deg, ${theme.palette.secondary.light}70, ${theme.palette.secondary.main}30)`,
          py: 2.5,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon
              sx={{
                width: 36,
                height: 36,
                color: theme.palette.secondary.main,
                mr: 2,
              }}
            />
            <Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: isDarkMode ? '#fff' : theme.palette.secondary.dark,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                Co-Signer
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 400,
                  mt: 0.5,
                }}
              >
                Advanced Multi-Layer Security Protection
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              p: 0.5,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={`/images/protected-by-failsafe-${isDarkMode ? 'dark' : 'light'}.png`}
              alt="FAILSAFE Logo"
              sx={{ height: 40, width: 'auto', opacity: 0.9 }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: theme.palette.text.primary,
            fontWeight: 500,
            borderLeft: `4px solid ${theme.palette.secondary.main}`,
            pl: 2,
            py: 1,
          }}
        >
          The protective hand that shields your transactions with intelligent AI Co-Signer and multi-layered access
          control, ensuring only legitimate transactions are approved.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
            mb: 3,
          }}
        >
          {/* Feature cards */}
          {[
            {
              icon: <VpnKeyIcon sx={{ width: 20, height: 20, color: theme.palette.secondary.main, mr: 1 }} />,
              title: 'Safe Multisig',
              desc: 'Secure multi-signature approval flow',
            },
            {
              icon: <PublicIcon sx={{ width: 20, height: 20, color: theme.palette.secondary.main, mr: 1 }} />,
              title: 'IP & Geo Protection',
              desc: 'Location-based security restrictions',
            },
            {
              icon: <CheckCircleIcon sx={{ width: 20, height: 20, color: theme.palette.secondary.main, mr: 1 }} />,
              title: 'Contract Whitelist',
              desc: 'Approved smart contract interactions',
            },
          ].map((feature, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 1.5,
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {feature.icon}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            pt: 2,
            borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            AI-powered transaction monitoring
          </Typography>

          <Button
            variant="contained"
            size="medium"
            sx={{
              textTransform: 'none',
              bgcolor: '#000',
              color: '#fff',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                bgcolor: '#333',
              },
            }}
          >
            Launch Co-Signer
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

const Dashboard = (): ReactElement => {
  const router = useRouter()
  const { safe } = useSafeInfo()
  const { [CREATION_MODAL_QUERY_PARM]: showCreationModal = '' } = router.query
  const showSafeApps = useHasFeature(FEATURES.SAFE_APPS)
  const isSAPBannerEnabled = useHasFeature(FEATURES.SAP_BANNER)
  const supportsRecovery = useIsRecoverySupported()
  const [recovery] = useRecovery()
  const showRecoveryWidget = supportsRecovery && !recovery

  return (
    <>
      <Grid container spacing={3}>
        {supportsRecovery && <RecoveryHeader />}

        <Grid item xs={12}>
          <Overview />
        </Grid>

        <Grid item xs={12} className={css.hideIfEmpty}>
          <FirstSteps />
        </Grid>

        {safe.deployed && (
          <>
            {/* Add Co-Signer Widget */}
            <Grid item xs={12}>
              <GuardWidget />
            </Grid>

            <Grid item xs={12} xl={isSAPBannerEnabled ? 6 : 12} className={css.hideIfEmpty}>
              <SwapWidget />
            </Grid>

            <Grid item xs className={css.hideIfEmpty}>
              <ActivityRewardsSection />
            </Grid>

            <Grid item xs={12} />

            <Grid item xs={12} lg={6}>
              <AssetsWidget />
            </Grid>

            <Grid item xs={12} lg={6}>
              <PendingTxsList />
            </Grid>

            {/* {showSafeApps && (
              <Grid item xs={12} lg={showRecoveryWidget ? 12 : 6}>
                <FeaturedApps stackedLayout={!showRecoveryWidget} />
              </Grid>
            )} */}

            {/* {showSafeApps && (
              <Grid item xs={12}>
                <SafeAppsDashboardSection />
              </Grid>
            )} */}

            {/* <Grid item xs={12}>
              <GovernanceSection />
            </Grid> */}
          </>
        )}
      </Grid>

      {showCreationModal ? <CreationDialog /> : null}
    </>
  )
}

export default Dashboard
