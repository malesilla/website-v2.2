import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from "styled-components"
import {Row, Div} from '../Sections'
import {Colors} from '../Styling'
import graphic from "../../assets/images/graphic.png"
import Fragment from "../Fragment"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`
export default ({location, margin, flexDirection, flexDirection_tablet, alignItems, lang, limit, filter, padding, padding_tablet, height, width, justifyContent, imgPadding}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryNews{
      allNewsYaml{
        edges {
          node {
            news {
              name
              url
              image{
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )

                  # fluid(maxHeight: 60,){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              location
            }
            fields {
              lang
            }
          }
        }
      }
    }
    `)

  const languageNews = data.allNewsYaml.edges.find(({node}) => node.fields.lang === lang);
  let locationNews = typeof (languageNews) !== "object" ? [] : languageNews.node.news;
  if (filter) locationNews = locationNews.filter(filter)
  else if (location) locationNews = locationNews.filter(n => n.location === "all" || !location || n.location.includes(location));

  if (limit) locationNews = locationNews.slice(0, limit)

  if (locationNews.length === 0) {
    console.error(`No news to display for location `, location, locationNews)
    return null;
  }
  return (

    <Div width="100%"
      margin={margin ? margin : "35px 0"}
      margin_tablet={margin ? margin : "40px 0 0 0"}
      padding={padding}
      padding_tablet={padding_tablet}
      display="flex"
      height="auto"
      flexDirection={flexDirection}
      flexDirection_tablet={flexDirection_tablet}
      alignItems={alignItems}
      justifyContent="between"
      justifyContent_tablet="between"
    >
      {Array.isArray(locationNews) && locationNews.map((l, i) => {
        return (
          // <Div key={i} background={Colors.blue}>test</Div>
          <GatsbyImage
            key={i}
            style={{height: `${height}`, width: `${width}`, minWidth: "60px", margin: "0"}}
            imgStyle={{objectFit: "contain"}}
            alt={l.name}
            image={getImage(l.image != null && l.image.childImageSharp.gatsbyImageData)}
            // fluid={l.image != null && l.image.childImageSharp.fluid}
          />
        )
      })}

    </Div>
    // </Fragment>
  )
}

    // <Row github="/components/news" display={`flex`} marginTop="75px" justifyContent={`between`}>
    //   {locationNews.map((l, i) => (
    //     <Column style={{whiteSpace: "nowrap", height: "60px"}} key={i} size="2" size_md="3">
    //       <a href={l.url} target="_blank" rel="noopener noreferrer nofollow">
    //         <Img
    //           style={{height: "100%"}}
    //           imgStyle={{objectFit: "contain"}}
    //           alt={l.name}
    //           fluid={l.image.childImageSharp.fluid}
    //         />
    //       </a>
    //     </Column>
    //   ))}
    // </Row>