
import { Store } from 'react-notifications-component'


export const showNotification = ({title, message, type, insert, container}) => {
  Store.addNotification({
    title,
    message,
    type,
    insert,
    container,
    dismiss: {
      duration: 2000,
    }
  })
}

export const handleRightClick = (eve) => {
  eve.preventDefault()
  showNotification({
    title:'Warning',
    message:'Right click is disabled!',
    type:'danger',
    insert:'top', 
    container:'bottom-right'
  })
}