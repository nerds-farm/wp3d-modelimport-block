
import styles from './Button.scss'

export default function Button3d({url='', weight='normal',color='#000000', children}) {

  return (
    <>
      {url && <a href={url} target="_blank" rel="noreferrer" className='btn normal' style={{color: color}}>
          {children}
      </a>}
    </>
  )
}
