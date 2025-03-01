import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GridContainer, Div } from "../Sections";
import { H2, H3, Paragraph } from "../Heading";
import { Colors } from "../Styling";
// import Link from "gatsby-link";
import Fragment from "../Fragment";

const GeeksVsOthers = (props) => {
  const data = useStaticQuery(graphql`
    query newGeeksVsOthersQuery {
      allGeeksVsOthersYaml {
        edges {
          node {
            fields {
              lang
            }
            info {
              features
              at4_Geeks
              industry_average
              why_important
              icon
            }
            globe_text
            titles {
              featured
              at_geeks
              average
            }

            button {
              button_text
              button_link
            }
          }
        }
      }
    }
  `);

  let geeks = data.allGeeksVsOthersYaml.edges.find(
    ({ node }) => node.fields.lang === props.lang
  );
  if (geeks) geeks = geeks.node;

  return (
    <Fragment github="/components/geeks_vs_others">
      {props.title && props.paragraph && (
        <GridContainer margin_tablet="0 0 38px 0" margin="0 0 24px 0">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding_tablet="0 4em"
            padding="0 2em"
          >
            <H2 margin="0 0 15px 0">{props.title}</H2>
            <Paragraph>{props.paragraph}</Paragraph>
          </Div>
        </GridContainer>
      )}

      {/* 3 / span 10 */}
      <GridContainer
        borderRadiusChild="3px"
        borderRadiusChild_tablet="3px"
        overflowChild="auto"
        containerColumns_tablet={`2fr repeat(10, 1fr) 2fr`}
        gridColumn_tablet="2 / span 10"
        columns_tablet="9"
        columns="3"
        backgroundChild="#FFF1D1"
        gridGap="0"
        padding_tabletChild="11px 11px 11px 44px"
      >
        <Div
          gridColumn_tablet="1 / 4"
          height="74px"
          alignItems="center"
          padding="0 5px 0 20px"
          padding_tablet="0 5px 0 10px"
        >
          <H3
            textAlign="left"
            fontSize="15px"
            fontWeight="900"
            lineHeight="19px"
          >
            {geeks.titles.featured}
          </H3>
        </Div>
        <Div
          gridColumn_tablet="4 / 7"
          height="74px"
          alignItems="center"
          background={Colors.veryLightBlue}
          padding="0 25px 0 20px"
          padding_tablet="0 5px 0 40px"
        >
          <H3
            textAlign="left"
            fontSize="15px"
            fontWeight="900"
            lineHeight="19px"
          >
            {geeks.titles.at_geeks}
          </H3>
        </Div>
        <Div
          gridColumn_tablet="7 / 10"
          height="74px"
          alignItems="center"
          background={Colors.white}
          padding="0 25px 0 20px"
          padding_tablet="0 5px 0 40px"
        >
          <H3
            textAlign="left"
            fontSize="15px"
            fontWeight="900"
            lineHeight="19px"
          >
            {geeks.titles.average}
          </H3>
        </Div>

        {geeks.info.slice(0, props.limit || geeks.info.length).map((m, i) => {
          return (
            <React.Fragment key={i}>
              <Div
                gridColumn_tablet="1 / 4"
                borderBottom={
                  i < geeks.info.length - 1 &&
                  "1px solid rgba(164, 164, 164, 0.4)"
                }
                height="74px"
                alignItems="center"
                padding="0 5px 0 20px"
                padding_tablet="0 5px 0 10px"
              >
                <H3
                  textAlign="left"
                  fontSize="15px"
                  fontWeight="400"
                  lineHeight="22px"
                  textTransform="uppercase"
                >
                  {m.features}
                </H3>
              </Div>
              <Div
                gridColumn_tablet="4 / 7"
                borderBottom={
                  i < geeks.info.length - 1 &&
                  "1px solid rgba(164, 164, 164, 0.4)"
                }
                height="74px"
                alignItems="center"
                background={Colors.veryLightBlue}
                padding="0 25px 0 20px"
                padding_tablet="0 5px 0 40px"
              >
                <H3
                  textAlign="left"
                  fontSize="15px"
                  fontWeight="400"
                  lineHeight="22px"
                  textTransform="uppercase"
                >
                  {m.at4_Geeks}
                </H3>
              </Div>
              <Div
                gridColumn_tablet="7 / 10"
                borderBottom={
                  i < geeks.info.length - 1 &&
                  "1px solid rgba(164, 164, 164, 0.4)"
                }
                height="74px"
                alignItems="center"
                background={Colors.white}
                padding="0 25px 0 20px"
                padding_tablet="0 5px 0 40px"
              >
                <H3
                  textAlign="left"
                  fontSize="15px"
                  fontWeight="400"
                  lineHeight="22px"
                  textTransform="uppercase"
                >
                  {m.industry_average}
                </H3>
              </Div>
            </React.Fragment>
          );
        })}
      </GridContainer>
      <GridContainer margin="0 0 36px 0" margin_tablet="0 0 76px 0">
        {props.link && (
          <Div justifyContent="center" margin="50px 0 0 0">
            <Link to={geeks.button.button_link}>
              <Paragraph color={Colors.blue}>
                {geeks.button.button_text}
              </Paragraph>
            </Link>
          </Div>
        )}
      </GridContainer>
    </Fragment>
  );
};

export default GeeksVsOthers;
