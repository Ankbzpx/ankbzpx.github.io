"use strict";(self.webpackChunkmy_projects=self.webpackChunkmy_projects||[]).push([[5],{6944:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>x,contentTitle:()=>m,default:()=>v,frontMatter:()=>f,metadata:()=>u,toc:()=>j});var i=n(5893),t=n(1151),o=n(7294),l=n(7119),r=n(5029),a=n(398),c=n(9594),d=n(7836),g=n(5944);const h=()=>{const e=(0,l.F)(d.E,"/mesh/badge/badge.glb");return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("primitive",{object:e.scene})})};function p(){return(0,i.jsx)(r.Xz,{camera:{position:[.25,.5,.25],fov:55},children:(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(h,{}),(0,i.jsx)(a.z,{dampingFactor:.1}),(0,i.jsx)(c.qA,{preset:"sunset"})]})})}const f={sidebar_position:3},m="Badge Generation using Polygon Offset",u={id:"badge-generation-using-polygon-offset",title:"Badge Generation using Polygon Offset",description:"This is a mesh generation projection I have worked on in industry. The goal is straightforward: given a cover image, generate a badge like textured 3D model, with its edge customizable by artists.",source:"@site/docs/badge-generation-using-polygon-offset.mdx",sourceDirName:".",slug:"/badge-generation-using-polygon-offset",permalink:"/badge-generation-using-polygon-offset",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"projectSidebar",previous:{title:"Neural Implicit Octahedral Field (WIP)",permalink:"/neural-implicit-octahedral-field"},next:{title:"Learning Visibility Field for Detailed 3D Human Reconstruction and Relighting",permalink:"/visibility-field"}},x={},j=[];function y(e){const s={a:"a",h1:"h1",p:"p",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"badge-generation-using-polygon-offset",children:"Badge Generation using Polygon Offset"}),"\n",(0,i.jsx)(s.p,{children:"This is a mesh generation projection I have worked on in industry. The goal is straightforward: given a cover image, generate a badge like textured 3D model, with its edge customizable by artists."}),"\n",(0,i.jsxs)("div",{class:"container",children:[(0,i.jsxs)("div",{class:"row",children:[(0,i.jsx)("div",{class:"col col--4",children:(0,i.jsx)("img",{src:"/img/polygon_offset/britz.png"})}),(0,i.jsx)("div",{class:"col col--4",children:(0,i.jsx)("img",{src:"/img/polygon_offset/bezier.png"})}),(0,i.jsx)("div",{class:"col col--4",children:(0,i.jsx)(p,{})})]}),(0,i.jsxs)("p",{style:{textAlign:"center"},children:["Pipeline using my fan art of ",(0,i.jsx)(s.a,{href:"https://forlittletail.fandom.com/wiki/Britz_Strudel",children:"Britz"})," as cover image"]})]}),"\n",(0,i.jsxs)(s.p,{children:["Under initial assessment, the edge can be customized with a curve editor, and the generation is a perfect use case for Blender ",(0,i.jsx)(s.a,{href:"https://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/Bevelling_a_Curve",children:"bevel modifier"}),". However, the latter introduces self-intersection that are non-trivial to resolve--the only solution I found is to tetrahedralize everything then filter using ",(0,i.jsx)(s.a,{href:"https://igl.ethz.ch/projects/winding-number/",children:"generalized winding number"}),", but my attempt failed due to the crash of ",(0,i.jsx)(s.a,{href:"https://wias-berlin.de/software/index.jsp?id=TetGen&lang=1",children:"TetGen"}),"."]}),"\n",(0,i.jsx)("div",{class:"container",children:(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/blender_bevel_1.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/polygon_offset_1.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/blender_bevel_2.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/polygon_offset_2.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)("p",{style:{textAlign:"center"},children:"Blender bevel"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)("p",{style:{textAlign:"center"},children:"Polygon offset"})})]})}),"\n",(0,i.jsx)(s.p,{children:"After observing a sample model made by our 3D artist, I was immediately intrigued--it's quad, with boundary aligned edge loops beautifully propagating towards middle like ripples. He specifically emphasized the importance of those edge loops placement, so I decided to mimic it by polygon offset."}),"\n",(0,i.jsx)(s.p,{children:"Start by extracting contours of cover image and cutting user specified edge curve into segments. The horizontal projection of each segments determines the offset distance."}),"\n",(0,i.jsx)("div",{class:"container",children:(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/contour.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Contour extraction"})]}),(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/bezier_split.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Curve segment"})]})]})}),"\n",(0,i.jsxs)(s.p,{children:["To offset the polygon, I implemented the ",(0,i.jsxs)(s.a,{href:"https://mcmains.me.berkeley.edu/pubs/DAC05OffsetPolygon.pdf",children:["algorithm ",(0,i.jsx)("cite",{children:" proposed by Chen et al."})]}),". First offset and connect each segments, then use winding number (using ",(0,i.jsx)(s.a,{href:"https://www.glprogramming.com/red/chapter11.html",children:"GLU"}),") to filter boundary polygon."]}),"\n",(0,i.jsx)("div",{class:"container",children:(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/offset_raw.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Polygon offset"})]}),(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/offset_filter.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Offset cleanup"})]})]})}),"\n",(0,i.jsx)(s.p,{children:"The next step is to tessellate the gap between two polygons. Due to shrinkage (sometimes topology change), connecting closest vertices is prone to self intersection. The 2D tessellate methods, such as line sweeping, are also not applicable due to height difference. The feasible solution I found is the Delaunay triangulation."}),"\n",(0,i.jsxs)(s.p,{children:["Since it produces a convex hull, I filtered out simplices that have barycenter outside the gap, as well as edges that intersects exterior / interior polygons. The recover of simplices is the problem of ",(0,i.jsx)(s.a,{href:"https://stackoverflow.com/questions/4022662/find-all-chordless-cycles-in-an-undirected-graph",children:"finding all chordless cycles in undirected graph"}),", that can be solved using ",(0,i.jsx)(s.a,{href:"https://stackoverflow.com/questions/838076/small-cycle-finding-in-a-planar-graph",children:"wall-walking algorithm"}),", by marking the directed edge traversal (boundary once, elsewhere twice)."]}),"\n",(0,i.jsx)("div",{class:"container",children:(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_raw.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Delaunay triangulation"})]}),(0,i.jsxs)("div",{class:"col col--6",children:[(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_filter.png"}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Triangulation cleanup"})]})]})}),"\n",(0,i.jsx)(s.p,{children:"As illustrated below, it is quite robust."}),"\n",(0,i.jsxs)("div",{class:"container",children:[(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_sample_1.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_sample_2.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_sample_3.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/delaunay_all.png"})})]}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Side triangulations. The bottom right being the concatenation of all segments"})]}),"\n",(0,i.jsx)(s.p,{children:"Though not occur in this cover image, it can handle topology change, as demonstrated in the toy example below."}),"\n",(0,i.jsxs)("div",{class:"container",children:[(0,i.jsxs)("div",{class:"row row--no-gutters",children:[(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/topology_offset.png"})}),(0,i.jsx)("div",{class:"col col--6",children:(0,i.jsx)(g.Z,{img:"/img/polygon_offset/topology_delaunay.png"})})]}),(0,i.jsx)("p",{style:{textAlign:"center"},children:"Handle topology change"})]}),"\n",(0,i.jsx)(s.p,{children:"With polygons successfully tessellated, I use Blender to perform the rest (remove duplicated vertices, assign UV, texture)"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Afterthoughts"})," Though the proposed method is robust, reasonably fast (around 3 seconds) and can produce meaningful edge loops, it regrettably gives triangle mesh that cannot completely fulfill the artists' needs. Nevertheless, it is the project that brought me in and captivated me in geometry processing."]})]})}function v(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(y,{...e})}):y(e)}}}]);