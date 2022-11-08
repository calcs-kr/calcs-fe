// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const ChartLine = (props) => (
    <ResponsiveLine
        data={ props.data }
        margin={{ top: 20, right: 6, bottom: 25, left: 25 }}
        padding={0.55}
        colors={"#2D3D5F"}
        enablePoints={false}
        enableGridX={false}
        enableArea={true}
        areaOpacity={1}
        axisLeft={{
            axisLeft: 5,
            tickValues: [0, 20, 40, 60, 80, 100]
        }}
        legends={[]}
        axisTop={null}
        axisRight={null}
        animate={false}
        yScale={{
            type: 'linear',
            min: 0,
            max: 100,
        }}
    />
)

export default ChartLine