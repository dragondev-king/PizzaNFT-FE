
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

export const handleKeyDown = (e) => {
  if(e.keyCode === 123) {
    e.preventDefault();
    showNotification({
      title:'Warning',
      message:'This action is disabled!',
      type:'danger',
      insert:'top', 
      container:'bottom-right'
    })
 }
 if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  e.preventDefault();
  showNotification({
    title:'Warning',
    message:'This action is disabled!',
    type:'danger',
    insert:'top', 
    container:'bottom-right'
  })
 }
 if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
  e.preventDefault();
  showNotification({
    title:'Warning',
    message:'This action is disabled!',
    type:'danger',
    insert:'top', 
    container:'bottom-right'
  })
 }
 if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  e.preventDefault();
  showNotification({
    title:'Warning',
    message:'This action is disabled!',
    type:'danger',
    insert:'top', 
    container:'bottom-right'
  })
 }
 if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  e.preventDefault();
  showNotification({
    title:'Warning',
    message:'This action is disabled!',
    type:'danger',
    insert:'top', 
    container:'bottom-right'
  })
 }
}
