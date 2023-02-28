export const inputStyles = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    status: error ? 'error' : undefined,
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}
