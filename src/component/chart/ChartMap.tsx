import { ResponsiveGeoMap } from '@nivo/geo'
import countries from "./ChartMap.json";

const ChartMap = () => (
    <ResponsiveGeoMap
        features={countries?.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        projectionType="equirectangular"
        projectionScale={50}
        projectionTranslation={[ 0.5, 0.6 ]}
        projectionRotation={[ 0, 0, 0 ]}
        fillColor="#2D3D5F"
        borderWidth={0.5}
        borderColor="#FFFFFF"
        graticuleLineWidth={0}
        graticuleLineColor="#000000"
    />
);

export default ChartMap