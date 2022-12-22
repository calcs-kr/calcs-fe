// Style
import styles from './Statistic.module.css';

export function StatisticSkeleton() {
	return (
        <>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<span className={ styles.statistic_item__frame_title_text }>Total Service</span>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }></span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<div className={ styles.statistic_item__frame_title }>
						<span className={ styles.statistic_item__frame_title_text }>New Service</span>
						<span className={ styles.statistic_item__frame_title_text_ }>(7day)</span>
					</div>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }>01</span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>
			<div className={ styles.statistic_detail }>
				<div className={ styles.statistic_item__frame }>
					<span className={ styles.statistic_item__frame_title_text }>Total Traffic</span>
					<div className={ styles.statistic_item__frame_space }></div>
					<span className={ styles.statistic_item__frame_value }>101,762</span>
				</div>

				<img className={ styles.statistic_item__frame_img } src='/icon/icon.png' alt='' />
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__traffic_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Word Traffic</span>
					<span className={ styles.statistic_item__section_link }>View More &gt;</span>
				</div>

				<div className={ styles.statistic_item__traffic_mid }>
				</div>

				<div className={ styles.statistic_item__traffic_btm }>
					<div className={ styles.statistic_item__traffic_btm_table }>
						<div className={ styles.statistic_item__traffic_btm_table_head }>
							<span className={ styles.statistic_item__traffic_btm_table_head__rank }>Rank</span>
							<span className={ styles.statistic_item__traffic_btm_table_head__country }>Country</span>
							<span className={ styles.statistic_item__traffic_btm_table_head__view }>View</span>
						</div>

						{ /*traffic.map((item, index) => {
							if( index >= 7 ) return null
							return (
								<div className={ styles.statistic_item__traffic_btm_table_body } key={ item._id }>
									<span className={ styles.statistic_item__traffic_btm_table_body__rank }>01</span>
									<span className={ styles.statistic_item__traffic_btm_table_body__country }>Korean</span>
									<span className={ styles.statistic_item__traffic_btm_table_body__view }>365</span>
								</div>
							)
						} ) */}
					</div>
				</div>
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Project Schdule</span>
					<span className={ styles.statistic_item__section_link }>View More &gt;</span>
				</div>

				<div className={ styles.statistic_item__schdule_mid }>
					<div className={ styles.statistic_item__schdule_mid_chart }>
					</div>

					<div className={ styles.statistic_item__schdule_mid_table }>
						<div className={ styles.statistic_item__schdule_mid_table_head }>
							<span className={ styles.statistic_item__schdule_mid_table_head__rank }>Rank</span>
							<span className={ styles.statistic_item__schdule_mid_table_head__country }>Project</span>
							<span className={ styles.statistic_item__schdule_mid_table_head__view }>Days</span>
						</div>
					</div>
				</div>

				<div className={ styles.statistic_item__schdule_btm }>
				</div>
			</div>

			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__memory_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>Memory Usage</span>
					<div className={ styles.statistic_item__memory_top_division }>
						<div className={styles.statistic_item__memory_top_division__active }>
							<span>일간</span>
						</div>
						<div className={styles.statistic_item__memory_top_division__active }>
							<span>주간</span>
						</div>
					</div>
				</div>

				<div className={ styles.statistic_item__memory_mid }>
					{ /* (!memGraphStatus)
					? <ChartLine data={memForDay} />
						: <ChartLine data={data1} /> */}
				</div>
			</div>



			<div className={ styles.statistic_detail }>
				<div className={[ styles.statistic_item__view_top, styles.statistic_item__top ].join(' ') }>
					<span className={ styles.statistic_item__section_title }>View Time</span>
					<div className={ styles.statistic_item__memory_top_division }>
						<div className={ styles.statistic_item__memory_top_division__active }>
							<span>주간</span>
						</div>
						<div className={ styles.statistic_item__memory_top_division__active }>
							<span>월간</span>
						</div>
					</div>
				</div>

				<div className={ styles.statistic_item__memory_mid }>
					{ /*(!viewGraphStatus)
					? <ChartBar data={data2} />
						: <ChartBar data={data2} /> */ }
				</div>
			</div>
		</> 
	)
}
