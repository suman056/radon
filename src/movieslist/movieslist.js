let movielist=['Rang de basanti','The shining', 'Lord of the rings', 'Batman begins','Ironman']
let filmlist=[]
for(let i=0;i<movielist.length;i++){
    let filmlist1={}
  filmlist1={
    'id':i,
    'name':movielist[i]}    

  filmlist.push(filmlist1)
}


module.exports.filmlist=filmlist
module.exports.movielist=movielist