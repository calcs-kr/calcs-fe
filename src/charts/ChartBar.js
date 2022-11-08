// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/geo
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const ChartBar = (props) => (
    <ResponsiveBar
        data={ props.data }
        keys={[ 'views' ]}
        indexBy="day"
        margin={{ top: 0, right: 0, bottom: 16, left: 25 }}
        padding={0.55}
        colors={["#2D3D5F", "rgba(255,255,255,0.0)" ]}
        legends={[]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
        }}
        axisLeft={{
            axisLeft: 5
        }}
        animate={false}
        enableGridY={true}
        enableLabel={false}
        tooltip={({ id, value, color }) => (
            <div style={{ padding: 6, color, background: '#2D3D5F' }} >
                {id}: {value}
            </div>
        )}
        theme={{
            axis: {
                fontSize: "10px",
                tickColor: "#2D3D5F",
                ticks: {
                    line: {
                        stroke: "#2D3D5F"
                    },
                    text: {
                        fill: "#2D3D5F"
                    }
                },
                legend: {
                    text: {
                        fill: "#2D3D5F"
                    }
                }
            },
        }}
    />
);

export default ChartBar