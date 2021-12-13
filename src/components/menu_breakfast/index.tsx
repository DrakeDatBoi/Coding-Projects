import React from "react";

export const Menu_Breakfast = () => {
  // <vm/localhost>:8080/api/menu
  // var str = getFormattedList();
  return (
    <>
      <p>TEST BREAKFAST MENU TAB PAGE</p>
    </>
  );
};

function getFormattedList(){
  const obj = JSON.parse(httpGet());
  var contents = obj.contents;
  const formatted = "<>\n";
  for (var i=0; i< contents.length; i++){
      formatted.concat("", "\n<h2>"+ contents[i].sectionName+ "</h2>\n");
      for (var j=0; j < contents[i].itemList.length; j++){
          formatted.concat("","<p>" + contents[i].itemList[j].name);
          formatted.concat("", ": " + String(contents[i].itemList[j].calories)+ "calories");
          formatted.concat("","  $" + contents[i].itemList[j].price);
          formatted.concat("", "Qualities: ");
          for (var k=0; k< contents[i].itemList[j].qualities.length; k++){
            formatted.concat(",", contents[i].itemList[j].qualities[k]);
          }
          formatted.concat("", "Allergens: ");
          for (var l =0; l < contents[i].itemList[j].allergens.length; l++){
            formatted.concat(",", contents[i].itemList[j].qualities[k]);
          }
          formatted.concat("","</p>");
      }
      formatted.concat("", "\n");
  }
  return formatted.concat("", "</>");

}

function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/api/menu/breakfast", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
export default Menu_Breakfast;