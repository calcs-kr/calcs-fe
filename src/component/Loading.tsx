// Style
import styles from './Loading.module.css'

function Loading(props: { loading: boolean }) {
    return ( 
        <>
            <div className={ styles.loading } data-done={ props.loading }>
                <video autoPlay muted height='100%' width='100%'>
                    <source src={'/video/intro.mp4'}  type='video/mp4' />
                </video>
            </div>
        </>
    )
}

export default Loading