import { Button, IButton } from './Button'

export const FloatButton = ({ style, ...props }: IButton) => {
  return (
    <Button
      {...props}
      style={{
        ...style,
        position: 'fixed',
        bottom: 10,
        right: 10,
        borderRadius: '100%',
        padding: 0,
        boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
      }}
    />
  )
}
