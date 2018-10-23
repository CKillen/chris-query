const cq = el => {
  let element = document.querySelectorAll(el);
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
  }
}

const chris = {
  element: null,
  elementCall: null,
  style: "",
  grab: function(domElement)
        {
          element = document.querySelectorAll(domElement);

          return this;
        },
  log: function()
        {
          console.log(element);
        },




    append: function(element)
        {

        }
};

cq("#change-").off("click")


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

