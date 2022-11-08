import { ResponsivePie } from "@nivo/pie"

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let value = dataWithArc[0].value
    return (
        <text
            x = {centerX}
            y = {centerY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fill: "white",
                fontSize: "2.1rem",
                fontWeight: 400,
            }}
        >
            {value}%
        </text>
    )
}

const ChartPie = (props) => {
    var service = props.percent

    const piedata = [{
        id: "service",
        label: "service",
        value: service,
        color: "#FFFFFF"
    }, {
        id: "none",
        label: "none",
        value: 100 - service,
        color: "#000000"
    }];
    return (
        <ResponsivePie
            data={piedata}
            innerRadius={0.88}
            activeOuterRadiusOffset={8}
            enableArcLinkLabels={false}
            isInteractive={false}
            arcLinkLabelsSkipAngle={10}
            enableArcLabels={false}
            layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredMetric]}
            colors={["#FFFFFF", "rgba(255,255,255,0.0)" ]}
        /> );
    };

export default ChartPie