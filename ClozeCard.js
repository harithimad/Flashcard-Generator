var BasicCard= require("./BasicCard.js");
function ClozeCard(text,cloze){
	this.fulltext=text,
	this.cloze=cloze,
	this.partial = this.fulltext.replace(this.cloze,". . .");
	// function(){
	// 	if(this.fulltext.includes(this.cloze))
	// 		{
	// 			return(this.fulltext.replace(this.cloze,". . ."));
	// 		}
	// 	}
		
	}
		
	
	

// var card = new BasicCard ("George Washington","the best man alive");
// var clozed=new ClozeCard(card.front+" "+card.back,card.front);
// console.log(clozed);

// // console.log(clozed.fulltext);
// // console.log(clozed.cloze);
// // console.log(clozed.partial);
module.exports=ClozeCard;
