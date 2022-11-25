// Style
import styles from './Tool.module.css';


export function ToolSkeletonSearch() {
    {/* 아이템 구역 */}
	return (
        <span className={ styles.tool_ske_item__search_text }></span>
	)
}

export function ToolSkeletonService() {
    {/* 아이템 구역 */}
	return (
        <div className={[ styles.tool_detail, styles.tool_detail__tool ].join(' ') }> 
            { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => {
                return (
                    <div className={ styles.tool_item__tool } key={ index }>
                        <div className={ styles.tool_ske_item__tool }>
                            <div className={ styles.tool_ske_item_tool_box }></div>
                            {/* <img className={ styles.tool_ske_item__tool_img } src='/img/service.png' alt='' /> */}
                        </div>

                        <div className={ styles.toot_item__tool_data }>
                            <div className={ styles.toot_item__tool_data_top }>
                                <span className={ styles.tool_ske_item__tool_category }></span>
                                <span className={ styles.tool_ske_item__tool_name }></span>
                                <span className={ styles.tool_ske_item__tool_describe }></span>
                            </div>

                            <div className={ styles.toot_ske_item__tool_data_btm }>
                            </div>
                        </div>
                    </div>
                )
            }) }
        </div>
	)
}