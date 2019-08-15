import { useState } from 'react';


export function useVisible (defaultVisible:boolean):[boolean, ()=>void]  {
  const [visible, setVisible] = useState(defaultVisible)

  const changeVisible = () => setVisible(visible => !visible)

  return [visible, changeVisible]
}
