import React from "react";
import Layout from '../global/LandingLayout';

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const BaseRender = (Page, options={}) => (props) => {
    const {data, pageContext} = props;
    let yml = null;
    try {
        yml = data[`all${cap(pageContext.type)}Yaml`].edges[0].node;
    }
    catch (err) {
        // console.error("Props: ", props);
        console.error("There was a problem loading the data", data);
        console.error(err);
        return <div className="alert alert-danger">There was a problem loading the data</div>
    }

    return <Layout emptyNavbar={options.landingNavbar} landingFooter={options.landingFooter} seo={yml.meta_info} context={pageContext}>
        {/* <StickyBar /> */}
        <Page {...props} yml={yml} />
    </Layout>
};
export default BaseRender;