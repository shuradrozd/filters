angular.module("exampleApp")
.filter("labelCase", function () {
	return function (value, reverse) {
		if (angular.isString(value)) {
			var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
			return (reverse ? intermediate[0].toLowerCase() : intermediate[0].toUpperCase())  + intermediate.substr(1);
		} else {
			return value;
		}
	};
}) 

.filter("myFilter", function() {
	return function(value) {
		var result = [];
		if (angular.isString(value)) {
			
			for (var i = 0; i < value.length; i++) {
				result.push(i % 2 == 0 ? value[i].toUpperCase() : value[i]);
			} 
		return result.join("");
		} else {
			return value;
		}
	}
})

.filter("skip", function() {
	return function(data, count) {
		if (angular.isArray(data) && angular.isNumber(count)) {
			if (count < 1 && count > data.length) {
				return data;
			} else {
				return data.slice(count);
			} 
		} else {
			return data;
		}

	}
})

.filter("take", function($filter) {
	return function(data, skipCount, takeCount) {
		var skippedData = $filter("skip")(data, skipCount);
		return $filter("limitTo")(skippedData, takeCount);
	}
})