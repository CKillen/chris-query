const cq = el => {
  let element = null;

  if(el.includes("<") && el.includes(">"))
  {
    //create a nodelist like elmenet for new div
    element = Object.create(NodeList, {
      '0': {value: document.createElement(el.substring(1, el.length -1)), enumerable: true},
      'length': {value: 1},
      'item': {
          "value": function (i) {
              return this[+i || 0];
          }, 
          enumerable: true
      }
    });
    //element = Object.create(NodeList, {0: document.createElement(el.substring(1, el.length -1))});
  }
  else
  {
    element = document.querySelectorAll(el);
    
  }

  let elementClass = "";
  let elementHtmlList = [];
  let elementStyle = "";
  return {
    log: function() {
      console.log(element);
    },
    on: function(listen, callback)
    {

      for(let i = 0; i < element.length; i++)
      {
        element[i].addEventListener(listen, callback);

        if(!element[i].hasOwnProperty('callbacks'))
        {
          element[i].callbacks = {};
        }
        if(!element[i].callbacks.hasOwnProperty(listen))
        {
          element[i].callbacks[listen] = [callback];
        }
        else if(element[i].callbacks.hasOwnProperty(listen))
        {
          element[i].callbacks[listen].push(callback);
        }

      }
      return this;
    },
    off: function()
    {
      
      for(let i = 0; i < element.length; i++)
      {
        
        if(element[i].callbacks !== undefined)
        {
          for(callback in element[i].callbacks)
          {
            for(let j = 0; j < element[i].callbacks[callback].length; j++)
            {
              element[i].removeEventListener(callback, element[i].callbacks[callback][j]);
            }

            //delete off js object
            delete element[i].callbacks[callback];

          }
        }
      }
      return this;

    },
    addCss: function(style, value)
    {
      elementStyle += `${style}: ${value};`;

      
      for(let i = 0; i < element.length; i++)
      {
        element[i].setAttribute("style", elementStyle);
      }
      return this;
    },
    removeCss: function(style)
    {
      elementStyle = elementStyle.replace(elementStyle.substring(elementStyle.indexOf(style) , elementStyle.indexOf(";", elementStyle.indexOf(style))+1), "");
      for(let i = 0; i < element.length; i++)
      {
        element[i].setAttribute("style", elementStyle);
      }
      return this;
    },
    append: function(appendElement)
    {

      for(let i = 0; i < appendElement.getElements().length; i++)
      {

        element[element.length -1].appendChild(appendElement.getElements()[i]);
      }

      return this;
    },
    text: function(text)
    {
      
      for(let i = 0; i < element.length; i++)
      {
        let textNode = document.createTextNode(text);
        element[i].appendChild(textNode);
      }
      return this; 
    },
    addClass: function(addClass)
    {
      elementClass += " " + addClass;

      for(let i = 0; i < element.length; i++)
      {
        element[i].className = elementClass;
      }
      return this;
    },
    removeClass: function(removeClass)
    {
      elementClass = elementClass.replace(removeClass, "");
      for(let i = 0; i < element.length; i++)
      {
        element[i].className = elementClass;
      }
      return this;
    },
    empty: function()
    {
      for(let i = 0; i < element.length; i++)
      {
        element[i].innerHTML = "";
      }
      return this; 
    },
    html: function()
    {
      for(let i = 0; i < element.length; i++)
      {
        elementHtmlList.push(element[i].innerHTML);
      }
      console.log(elementHtmlList);
    },
    getElements: function()
    {
      let elementList = [];

      for(let i = 0; i < element.length; i++)
      {
        elementList.push(element[i]);
      } 

      return elementList;
    }
  }
}


cq(".chris").addCss('height', '100px').addCss('background', 'red').addCss("border" , "12px black solid").removeCss("background");

cq("#change-on").on("click", function()
{
  cq("#test").on("click", function()
  {
    alert("hi");
  })

});

cq("#change-off").on("click", function()
{
  cq("#test").off("click")
});

cq(".chris").addClass("test").addClass("true");

