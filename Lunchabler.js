var LunchDecider = function(restaurants, choicesMatrix, entireGroup) {
  this.restaurants = restaurants;
  this.choicesMatrix = choicesMatrix;
  this.entireGroup = entireGroup;
};

LunchDecider.prototype = {
  
  getRestaurantsRanked: function(lunchGroup) {
    var restaurants_with_preferences = [];
    
    for (var i = 0; i < this.restaurants.length; i++) {
      
      if(this.restaurants[i] == "") {
        continue;
      }
      
      var mehCount = 0;
      var noCount = 0;
      
      for (var j = 0; j < lunchGroup.length; j++) {
        var personChoice = this.choicesMatrix[i][this.entireGroup.map(toUpper).indexOf(lunchGroup[j].toUpperCase())];
        
        if(personChoice === "N") {
          noCount++;
        }
        else if(personChoice === "M") {
          mehCount++;
        }
      }
      
      restaurants_with_preferences.push([
        this.restaurants[i],
        noCount,
        mehCount
      ]); 
    }
    
    return restaurants_with_preferences.sort(this._compareNos).sort(this._compareMehs);
  },
  
  _compareNos: function(a, b) {
    if((a[1] > b[1])) {
      return 1;
    }
    else if(a[1] < b[1]) {
      return -1;
    }
    return 0;
  },
  
  _compareMehs: function(a, b) {
    if(a[1] !== b[1]) {
      return 0; 
    }  
    else if(a[2] > b[2]) {
      return 1;
    }
    else if(a[2] < b[2]) {
      return -1;
    }
    return 0;
  }
  
//  _listRestaurantsFromRankings: function(restaurants_ranked) {
//    restaurants_only = [];
//    for(var i = 0; i < restaurants_ranked.length; i++) {
//      var currRestaurant = restaurants_ranked[i];
//      
//      if(currRestaurant.noCount == 0) {
//        restaurants_only.push(restaurants_ranked[i].name); 
//      }
//    }
//    return restaurants_only;
//  }
};

/* CUSTOM FUNCTIONS RUN BY SPREADSHEET */

function getAcceptableRestaurants(lunchGroup, restaurants, choicesMatrix, entireGroup) {
  var flattenedLunchGroup = flatten(lunchGroup);
  var flattenedRestaurants = flatten(restaurants);
  var flattenedEntireGroup = flatten(entireGroup);
  
  var lunchDecider = new LunchDecider(flattenedRestaurants, choicesMatrix, flattenedEntireGroup);
  return lunchDecider.getRestaurantsRanked(flattenedLunchGroup); 
}

function listRankingNumbers(restaurantsRange) {
  var rankingNumbers = [];
  for(var i = 1; i <= restaurantsRange.length; i++) {
    if(restaurantsRange[i-1] == '') {
      break;
    }
    rankingNumbers.push(i + ".");
  }
    
  return rankingNumbers; 
}

/* HELPERS */

function flatten(nestedArray) { 
  return nestedArray.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

function toUpper(x){ 
  return x.toUpperCase();
}

