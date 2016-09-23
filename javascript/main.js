var app = angular.module('homePage', ["ngRoute"]);
app.controller('firstCtrl', function($scope, $http) {


    $scope.mainHeader = "City Visualization";

    $scope.showStats = false;
    $scope.show = false;
    $scope.showButt = true;

    var INCOME_WIDTH = 150;
    var POV_LINE_WIDTH = .2;
    var POP_WIDTH = 2000;
    var POP_DENS_WIDTH = 30;
    var COST_OF_LIVING_WIDTH = .004;

    var bars = [];

    var incomeBar1Data = [{category: "medianIncome", value: 34384, widthDivision: INCOME_WIDTH}];
    var incomeBar2Data = [{category: "medianIncome", value: 63470, widthDivision: INCOME_WIDTH}];

    var pcIncomeBar1Data = [{category: "pcIncome", value: 22551, widthDivision: INCOME_WIDTH }];
    var pcIncomeBar2Data = [{category: "pcIncome", value: 42369, widthDivision: INCOME_WIDTH}];

    var povLineBar1Data = [{category: "povLine", value: 73, widthDivision: POV_LINE_WIDTH }];
    var povLineBar2Data = [{category: "povLine", value: 86.8, widthDivision: POV_LINE_WIDTH}];

    var popBar1Data = [{category: "population", value: 317419, widthDivision: POP_WIDTH}];
    var popBar2Data = [{category: "population", value: 668342, widthDivision: POP_WIDTH}];

    var popDensBar1Data = [{category: "populationDens", value: 5127, widthDivision: POP_DENS_WIDTH}];
    var popDensBar2Data = [{category: "populationDens", value: 7962, widthDivision: POP_DENS_WIDTH}];

    var costOfLivingBar1Data = [{category: "costOfLiving", value: 0.92, widthDivision: COST_OF_LIVING_WIDTH}];
    var costOfLivingBar2Data = [{category: "costOfLiving", value: 1.7, widthDivision: COST_OF_LIVING_WIDTH}];


    var pictures =
    [
        {section: "income", id: "moneyPic", url: "images/money.jpg"},
        {section: "population", id: "popPic", url: "images/popDens.jpg"},
        {section: "economy", id: "economyPic", url: "images/economy.jpg"}
    ];

    $scope.displayBars = function()
    {
             $scope.showButt = false;
            $scope.show = true;

            var city1 = [
             { name:"St. Louis",  income:34384, pcIncome: 22551, lifeExp: 71.3, pop:317419, popDensity: 5127}
            ];
            var city2 = [
             { name:"Seattle",  income:63470, pcIncome:42369, lifeExp: 78.7, pop:668342, popDensity: 7962}
            ];

            $scope.city1Name = city1[0].name;
            $scope.city2Name = city2[0].name;


            addBar("#incomeBar1", incomeBar1Data, "income")
            addBar("#incomeBar2", incomeBar2Data, "income")

            addBar("#pcIncomeBar1", pcIncomeBar1Data, "income")
            addBar("#pcIncomeBar2", pcIncomeBar2Data, "income")

            addBar("#povLineBar1", povLineBar1Data, "income")
            addBar("#povLineBar2", povLineBar2Data, "income")

            addBar("#populationBar1", popBar1Data, "population")
            addBar("#populationBar2", popBar2Data, "population")

            addBar("#popDensityBar1", popDensBar1Data, "population")
            addBar("#popDensityBar2", popDensBar2Data, "population")

            addBar("#costOfLivingBar1", costOfLivingBar1Data,"economy")
            addBar("#costOfLivingBar2", costOfLivingBar2Data,"economy")



            animateBars();



    }

    $scope.barClick = function(obj, $event)
    {
           fadeOutMainContent()
           updateHeader($event.currentTarget.id)

    }


    function fadeOutMainContent()
    {
         jQuery(".mainContent").animate({
                 opacity: 0,
            }, 1000, function() {
                 $scope.show = false;

                  jQuery(".mainContent").remove();


            jQuery(".secondContent").animate({
                     opacity: 1,
                }, 1000, function() {

                });

            });

    }
    function updateHeader(barID)
    {
        switch (barID)
            {
                case "incomeBar1":
                    $scope.mainHeader = "Median Household Income in " + $scope.city1Name + ": $" + incomeBar1Data[0].value.toLocaleString();
                    break;
                case "incomeBar2":
                    $scope.mainHeader = "Median Household Income in " + $scope.city2Name + ": $" + incomeBar2Data[0].value.toLocaleString();
                    break;
                case "pcIncomeBar1":
                    $scope.mainHeader = "Per Capita Income in " + $scope.city1Name + ": $" + pcIncomeBar1Data[0].value.toLocaleString();
                    break;
                case "pcIncomeBar2":
                    $scope.mainHeader = "Per Capita Income in " + $scope.city2Name + ": $" + pcIncomeBar2Data[0].value.toLocaleString();
                    break;
                case "povLineBar1":
                    $scope.mainHeader = "Population Above Poverty Line in " + $scope.city1Name + ": $" + povLineBar1Data[0].value + "%";
                    break;
                case "povLineBar2":
                    $scope.mainHeader = "Population Above Poverty Line in  " + $scope.city2Name + ": " + povLineBar2Data[0].value + "%";
                    break;
                 case "populationBar1":
                    $scope.mainHeader = "Total Population in " + $scope.city1Name + ": " + popBar1Data[0].value.toLocaleString() + " people";
                    break;
                case "populationBar2":
                    $scope.mainHeader = "Total Population in " + $scope.city2Name + ": " + popBar2Data[0].value.toLocaleString() + " people";
                    break;
                case "popDensityBar1":
                    $scope.mainHeader = "Population Density in " + $scope.city1Name + ": " + popDensBar1Data[0].value.toLocaleString() + " people/mi²";
                    break;
                case "popDensityBar2":
                    $scope.mainHeader = "Population Density in " + $scope.city2Name + ": " + popDensBar2Data[0].value.toLocaleString() + " people/mi²";
                    break;
                case "costOfLivingBar1":
                    $scope.mainHeader = "Cost of Living Index in " + $scope.city1Name + ": " + costOfLivingBar1Data[0].value + " x national average";
                    break;
                case "costOfLivingBar2":
                    $scope.mainHeader = "Cost of Living Index in " + $scope.city2Name + ": " + costOfLivingBar2Data[0].value + " x national average";
                    break;

                default:
                    console.log("ERROR");
                    break;
            }
    }

    function addBar(id, data, section)
    {
        var i;

        //setting picture
        for (i = 0; i < pictures.length; i++)
        {
            if(pictures[i].section == section)
            {
                break;
            }
        }

        bars.push(new Bar(id, data, pictures[i].url, pictures[i].id));

    }

    function animateBars()
    {
        var delay = 300;
        for (i = 0; i < bars.length; i++)
        {
            if( i % 2 == 0 && i != 0)
                delay += 500;

            bars[i].svg.transition()
                .delay(delay)
                .duration(1000)
                .attr("width", function(d) {return d.value/d.widthDivision})
        }
    }



});



app.config(function($routeProvider) {
    $routeProvider
    .when("/second", {
        templateUrl : "test.html"
     });
    });
