const mongoose=require("mongoose");
const sectionSchema=new mongoose.Schema({
    title: String,
    imageUrl: String,
    id: Number,
    linkUrl: String
});

const Section = new mongoose.model("Section",sectionSchema);
// const sections= [
//     {
//       title: 'hats',
//       imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
//       id: 1,
//       linkUrl: 'shop/hats'
//     },
//     {
//       title: 'jackets',
//       imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
//       id: 2,
//       linkUrl: 'shop/jackets'
//     },
//     {
//       title: 'sneakers',
//       imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
//       id: 3,
//       linkUrl: 'shop/sneakers'
//     },
//     {
//       title: 'womens',
//       imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
//       size: 'large',
//       id: 4,
//       linkUrl: 'shop/womens'
//     },
//     {
//       title: 'mens',
//       imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
//       size: 'large',
//       id: 5,
//       linkUrl: 'shop/mens'
//     }
//   ];
//   const insertSections=async ()=>{
//       for(let i=0;i<sections.length;i++)
//       {
//           const section =new Section(sections[i]);
//           await section.save();
//       }
//   }
// insertSections();