// Style
import styles from './Header.module.css';

export function HeaderSkeletonSnapshot() {
	return (
        <>
            <div className={ styles.header_ske_item__btm_value }></div>
        </>
	)
}

export function HeaderSkeletonStatus() {
	return (
        <>
            <div className={ styles.header_ske_item_chr_grph }></div>
            <div className={ styles.header_ske_item_chr_text }></div>
        </>
	)
}