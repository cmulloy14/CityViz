class Bar {
  constructor(id, data, imgURL, picID) {
    
    this.svg = d3.select(id).append("svg");

    this.svg.data(data)        
        .attr("width", 0)
        .attr("height", 50)
        .attr("rx", 20)
        .attr("ry", 20)

    var defs = this.svg.append('defs')
    var fillAttrString = "url(#" + picID + ")"

    defs.append('pattern')
        .attr('id', picID)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 150)
        .attr('height', 150)
        .append('svg:image')
        .attr('xlink:href', imgURL)
        .attr("width", 150)
        .attr("height", 150)
        .attr("x", 0)
        .attr("y", 0);

    this.svg.append("a")
        .append('path')
        .attr("d", "M 0,0, 600,0,  600,-100, 0,-100z") 
        .attr("transform", "translate(-50, 100)")
        .attr("fill", fillAttrString);

    this.svg.append("text")
        .attr("fill", "white")
        .style("font-size","24px")
        .attr("dx", function(d) {return (d.value/d.widthDivision)/2})
        .attr("dy", 37.5)
        .attr("text-anchor", "middle")
        .text(function(d) {
            if(d.category == "medianIncome" || d.category == "pcIncome")
               return "$" + d.value.toLocaleString()
            else if (d.category == "povLine")
                return  d.value + "%"
            else 
                return d.value.toLocaleString()
        });
     }
}
