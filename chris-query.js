// const cq = el => {
//   var element = document.querySelectorAll(el);
//   return {
//     log: function() {
//       console.log(el);
//     }
//   }
// }

const chris = {
  element: null,
  elementCall: null,
  style: "",
  grab: function(domElement)
        {
          this.element = document.querySelectorAll(domElement);


          return this;
        },
  log: function()
        {
          console.log(this.element);
        },
  on: function(listen, callback)
        {

          for(let i = 0; i < this.element.length; i++)
          {
            this.element[i].addEventListener(listen, callback);

            if(!this.element[i].hasOwnProperty('callbacks'))
            {
              this.element[i].callbacks = {};
            }
            if(!this.element[i].callbacks.hasOwnProperty(listen))
            {
              this.element[i].callbacks[listen] = [callback];
            }
            else if(this.element[i].callbacks.hasOwnProperty(listen))
            {
              this.element[i].callbacks[listen].push(callback);
            }

            //this.element[i].callbacks = {[listen]: [callback]};
          }
          return this;
        },
  off: function(listen, callback)
        {
          for(let i = 0; i < this.element.length; i++)
          {

            if(this.element[i].callbacks[listen] !== undefined)
            {
              for(callback in this.element[i].callbacks[listen])
              {
                this.element[i].removeEventListener(listen, this.element[i].callbacks[listen][callback]);
              }
            }
            else {
              this.element[i].removeEventListener(listen, callback);
            }
          }


          return this;
        },
  addCss: function(style, value)
        {
          this.style += `${style}: ${value};`;

          for(let i = 0; i < this.element.length; i++)
          {
            this.element[i].setAttribute("style", this.style);
          }
          return this;
        },
  removeCss: function(style)
        {
          this.style = this.style.replace(this.style.substring(this.style.indexOf(style) , this.style.indexOf(";", this.style.indexOf(style))+1), "");
          console.log(this.style);
          for(let i = 0; i < this.element.length; i++)
          {
            this.element[i].setAttribute("style", this.style);
          }
          return this;
        }
};



chris.grab("button").log();

chris.grab(".chris").addCss('height', '100px').addCss('background', 'red').addCss("border" , "12px black solid").removeCss("background");

chris.grab("#change-on").on("click", function()
{
  chris.grab("#test").on("click", function()
  {
    alert("hi");
  })

});

chris.grab("#change-off").on("click", function()
{
  chris.grab("#test").off("click")
});
