
// app/test/page.tsx

interface Props {
  title: string
}

export default function Test({title}: Props ){
  console.log('value is = ', title);
  
  return(
    'test page'
  )
}