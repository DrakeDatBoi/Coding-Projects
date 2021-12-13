import { integerPropType } from '@mui/utils';
import { stringify } from 'querystring';
import React from 'react';
import MenuItem from '../../classes/menu-item';
import * as objBakery from './bakery_list'


export function getFormattedList(){
    const obj = JSON.parse(httpGet("daily"));
    return parseJsonObj(obj.items);
  }

export function getBakeryFormattedList(){
  const obj = JSON.parse(httpGet("bakery"));
  return parseJsonObj(obj.items);
  }

  function parseJsonObj(contents: any){
    var menu_list: { [key: string]: MenuItem[] } = {}
    console.log(contents);
    console.log('items----');
    console.log(contents.items);
    console.log('Contents----');
    console.log(contents.contents);
    console.log('Hello----');

    // var contents = objParam;
      console.log(contents.length);
    for (var i=0; i< contents.length; i++){
      if (menu_list[contents[i].section] == null ){
        menu_list[contents[i].section] = []
      }
      let qualities_list = [];
      for (let k=0; k< contents[i].qualities.length; k++){
        qualities_list.push(contents[i].qualities[k]);
      }
      let allergens_list = [];
      for (let l =0; l < contents[i].allergens.length; l++){
        allergens_list.push(contents[i].allergens[l])
      }
      const new_item = new MenuItem(contents[i].id, contents[i].name, contents[i].calories, 
          contents[i].price, qualities_list, allergens_list)
      menu_list[contents[i].section].push(new_item)
      console.log("pushed " + contents[i].name);
    }
    return menu_list
  }
  
  function httpGet(menuName: string)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "/api/menu/" + menuName, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }
