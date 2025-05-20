import FirstSteps from '@/components/dashboard/FirstSteps'
import useSafeInfo from '@/hooks/useSafeInfo'
import type { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, Typography, Box, Button } from '@mui/material'
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

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(to right, ${theme.palette.secondary.dark}10, rgba(0, 0, 0, 0))`
            : `linear-gradient(to right, ${theme.palette.secondary.light}20, #ffffff)`,
        '&:hover': {
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? `0 8px 32px ${theme.palette.secondary.main}20`
              : `0 8px 32px ${theme.palette.secondary.main}15`,
        },
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
      onClick={openGuardApp}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SecurityIcon
            sx={{
              width: 28,
              height: 28,
              color: (theme) => theme.palette.secondary.main,
              mr: 1.5,
            }}
          />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            FailSafe Co-Signer
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: (theme) => theme.palette.text.primary,
            borderLeft: (theme) => `3px solid ${theme.palette.secondary.main}`,
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
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <VpnKeyIcon
              sx={{ width: 16, height: 16, color: (theme) => theme.palette.secondary.main, mt: 0.4, mr: 1 }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              Safe Multisig
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <PublicIcon
              sx={{ width: 16, height: 16, color: (theme) => theme.palette.secondary.main, mt: 0.4, mr: 1 }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              IP Restrictions & Geofencing
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CheckCircleIcon
              sx={{ width: 16, height: 16, color: (theme) => theme.palette.secondary.main, mt: 0.4, mr: 1 }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              Contract Whitelisting
            </Typography>
          </Box>
        </Box>

        {/* Additional security features */}
        <Box
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `${theme.palette.secondary.dark}15`
                : `${theme.palette.secondary.light}15`,
            p: 1.5,
            borderRadius: 1,
            mb: 2,
            border: (theme) => `1px dashed ${theme.palette.secondary.main}40`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.secondary.main, mb: 1, fontWeight: 600, fontSize: '0.85rem' }}
          >
            Enhanced Security Features
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: (theme) => theme.palette.secondary.main,
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                Time-based transaction constraints limit operations to specific hours
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: (theme) => theme.palette.secondary.main,
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                IP-address verification blocks transactions from unauthorized locations
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: (theme) => theme.palette.secondary.main,
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                Intelligent AI monitoring detects and prevents suspicious activities
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderColor: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: (theme) => `${theme.palette.secondary.main}10`,
              borderColor: (theme) => theme.palette.secondary.main,
            },
          }}
        >
          Open Co-Signer
        </Button>
      </Box>

      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.1 : 0.05),
          backgroundColor: (theme) => theme.palette.secondary.main,
          zIndex: 1,
        }}
      />
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
