// Style
import styles from './Tool.module.css';

function ToolSkeleton() {
	return (
		<div className={ styles.tool_frame }>
            {/* 검색 구역 */}
            <div className={ styles.tool_detail }>
                <div className={ styles.tool_item__search }>
                    <span className={ styles.tool_item__search_text }>0 Items</span>
                    <div className={ styles.tool_item__search_icon }>
                        <div className={ styles.tool_item__search_icon_frame }>
                            <input className={ styles.tool_item__search_icon_frame__input } placeholder='search' />
                            <img className={ styles.tool_item__search_icon_frame__img } src='/images/search.png' alt='' />
                        </div>
                        <img className={ styles.tool_item__search_icon_frame__img } src='/images/sort.png' alt='' />
                    </div>
                </div>
            </div>
            
            {/* 아이템 구역 */}
            <div className={[ styles.tool_detail, styles.tool_detail__tool ].join(' ') }>
                { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => {
                    return (
                        <div className={ styles.tool_item__tool } key={ index }>
                            <div className={ styles.tool_ske_item__tool }>
                                <img className={ styles.tool_ske_item__tool_img } src='/img/service.png' alt='' />
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
        </div>
	)
}

export default ToolSkeleton;