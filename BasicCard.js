//  a Constructor to create the basic cards
function BasicCard(front,back){
	this.front=front,
	this.back=back
	this.checkifwitwork=function(){
		console.log(this.front,this.back);
	}
		 
}				


//card.checkifwitwork();
//exporting it so we can grab it in the clozecard.js
module.exports = BasicCard;