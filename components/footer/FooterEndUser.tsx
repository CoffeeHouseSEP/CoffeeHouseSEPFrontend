import { useResponsive } from '@/hooks'

export default function FooterEndUser() {
  const pixel = useResponsive()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: pixel <= 1280 ? 'column' : 'row',
        background: '#53382c',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 25,
        width: '100%',
        color: '#fff',
        textAlign: 'center',
        height: 50,
      }}
    />
  )
}
