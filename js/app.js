var epool = epool || {};

var teamsJson = '[{"category":1,"teams":[{"name":"Belgium","rank":2},{"name":"Germany","rank":4},{"name":"Spain","rank":6},{"name":"France","rank":17}]},{"category":2,"teams":[{"name":"Portugal","rank":8},{"name":"Austria","rank":10},{"name":"England","rank":11},{"name":"Italy","rank":12},{"name":"Switzerland","rank":15}]},{"category":3,"teams":[{"name":"Turkey","rank":18},{"name":"Ukraine","rank":19},{"name":"Hungary","rank":20},{"name":"Romania","rank":22},{"name":"Poland","rank":27},{"name":"Croatia","rank":27}]},{"category":4,"teams":[{"name":"N_Ireland","rank":25},{"name":"Wales","rank":26},{"name":"Russia","rank":29},{"name":"Czech","rank":30},{"name":"Sweden","rank":35}]},{"category":5,"teams":[{"name":"Slovakia","rank":24},{"name":"R_Ireland","rank":33},{"name":"Iceland","rank":34},{"name":"Albania","rank":42}]}]',
	policyJson = '[{"category":1,"policy":[{"round":0,"point":{"w":3,"t":1}},{"round":1,"point":{"w":4,"t":1}},{"round":2,"point":{"w":5,"t":2}},{"round":3,"point":{"w":6,"t":2}},{"round":4,"point":{"w":8,"t":2}}]},{"category":2,"policy":[{"round":0,"point":{"w":4,"t":1}},{"round":1,"point":{"w":5,"t":2}},{"round":2,"point":{"w":6,"t":2}},{"round":3,"point":{"w":8,"t":3}},{"round":4,"point":{"w":10,"t":3}}]},{"category":3,"policy":[{"round":0,"point":{"w":5,"t":1}},{"round":1,"point":{"w":7,"t":2}},{"round":2,"point":{"w":9,"t":3}},{"round":3,"point":{"w":12,"t":4}},{"round":4,"point":{"w":15,"t":5}}]},{"category":4,"policy":[{"round":0,"point":{"w":6,"t":2}},{"round":1,"point":{"w":8,"t":3}},{"round":2,"point":{"w":11,"t":4}},{"round":3,"point":{"w":14,"t":5}},{"round":4,"point":{"w":20,"t":6}}]},{"category":5,"policy":[{"round":0,"point":{"w":8,"t":3}},{"round":1,"point":{"w":10,"t":4}},{"round":2,"point":{"w":14,"t":6}},{"round":3,"point":{"w":18,"t":7}},{"round":4,"point":{"w":25,"t":10}}]}]';

var matchesJson = '[{"teamName":"France","round":0,"result":"w","score":2,"rival":"Romania"},{"teamName":"Romania","round":0,"result":"l","score":1,"rival":"France"},{"teamName":"Switzerland","round":0,"result":"w","score":1,"rival":"Albania"},{"teamName":"Albania","round":0,"result":"l","score":0,"rival":"Switzerland"},{"teamName":"Wales","round":0,"result":"w","score":2,"rival":"Slovakia"},{"teamName":"Slovakia","round":0,"result":"l","score":1,"rival":"Wales"},{"teamName":"England","round":0,"result":"t","score":1,"rival":"Russia"},{"teamName":"Russia","round":0,"result":"t","score":1,"rival":"England"},{"teamName":"Turkey","round":0,"result":"l","score":0,"rival":"Croatia"},{"teamName":"Croatia","round":0,"result":"w","score":1,"rival":"Turkey"},{"teamName":"Poland","round":0,"result":"w","score":1,"rival":"N_Ireland"},{"teamName":"N_Ireland","round":0,"result":"l","score":0,"rival":"Poland"},{"teamName":"Germany","round":0,"result":"w","score":2,"rival":"Ukraine"},{"teamName":"Ukraine","round":0,"result":"l","score":0,"rival":"Germany"},{"teamName":"Spain","round":0,"result":"w","score":1,"rival":"Czech"},{"teamName":"Czech","round":0,"result":"l","score":0,"rival":"Spain"},{"teamName":"R_Ireland","round":0,"result":"t","score":1,"rival":"Sweden"},{"teamName":"Sweden","round":0,"result":"t","score":1,"rival":"R_Ireland"},{"teamName":"Belgium","round":0,"result":"l","score":0,"rival":"Italy"},{"teamName":"Italy","round":0,"result":"w","score":2,"rival":"Belgium"},{"teamName":"Austria","round":0,"result":"l","score":0,"rival":"Hungary"},{"teamName":"Hungary","round":0,"result":"w","score":2,"rival":"Austria"},{"teamName":"Portugal","round":0,"result":"t","score":1,"rival":"Iceland"},{"teamName":"Iceland","round":0,"result":"t","score":1,"rival":"Portugal"},{"teamName":"Russia","round":0,"result":"l","score":0,"rival":"Slovakia"},{"teamName":"Slovakia","round":0,"result":"w","score":2,"rival":"Russia"}]';

var allEntriesJson = '[{"id":0,"name":"Billy Chau","t0":"Germany","p0":6,"t1":"France","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Sweden","p4":2,"t5":"Spain","p5":3,"pp":20},{"id":1,"name":"David Zhang","t0":"France","p0":6,"t1":"Belgium","p1":0,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Portugal","p5":0,"pp":18},{"id":2,"name":"Albert Li #1","t0":"Germany","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Turkey","p3":0,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":16},{"id":3,"name":"Albert Li #2","t0":"England","p0":2,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Romania","p3":0,"t4":"Wales","p4":6,"t5":"Spain","p5":3,"pp":18},{"id":4,"name":"Albert Li #3","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"England","p2":1,"t3":"Turkey","p3":0,"t4":"Sweden","p4":2,"t5":"Spain","p5":3,"pp":15},{"id":5,"name":"Albert Li #4","t0":"Germany","p0":6,"t1":"France","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Iceland","p4":0,"t5":"Portugal","p5":0,"pp":15},{"id":6,"name":"Henry Kwok #1","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"England","p2":1,"t3":"Croatia","p3":5,"t4":"R_Ireland","p4":3,"t5":"Spain","p5":3,"pp":21},{"id":7,"name":"Henry Kwok #2","t0":"Germany","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Ukraine","p3":0,"t4":"R_Ireland","p4":3,"t5":"Belgium","p5":0,"pp":13},{"id":8,"name":"Henry Kwok #3","t0":"Spain","p0":6,"t1":"France","p1":3,"t2":"Portugal","p2":0,"t3":"Poland","p3":5,"t4":"Slovakia","p4":0,"t5":"Belgium","p5":0,"pp":14},{"id":9,"name":"Henry Kwok #4","t0":"England","p0":2,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Croatia","p3":5,"t4":"R_Ireland","p4":3,"t5":"France","p5":3,"pp":20},{"id":10,"name":"Peter Cheung","t0":"Germany","p0":6,"t1":"France","p1":3,"t2":"Italy","p2":4,"t3":"Poland","p3":5,"t4":"Russia","p4":2,"t5":"Belgium","p5":0,"pp":20},{"id":11,"name":"Kenny Cheung #1","t0":"France","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":21},{"id":12,"name":"Kenny Cheung #2","t0":"England","p0":2,"t1":"France","p1":3,"t2":"Italy","p2":4,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Spain","p5":3,"pp":23},{"id":13,"name":"Kenny Cheung #3","t0":"Spain","p0":6,"t1":"France","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":21},{"id":14,"name":"Kenny Cheung #4","t0":"Belgium","p0":0,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"France","p5":3,"pp":18},{"id":15,"name":"Dixon Fung #1","t0":"France","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":21},{"id":16,"name":"Dixon Fung #2","t0":"England","p0":2,"t1":"France","p1":3,"t2":"Italy","p2":4,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Spain","p5":3,"pp":23},{"id":17,"name":"Dixon Fung #3","t0":"Spain","p0":6,"t1":"France","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":21},{"id":18,"name":"Dixon Fung #4","t0":"Belgium","p0":0,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"France","p5":3,"pp":18},{"id":19,"name":"Eddie Lau #1","t0":"Belgium","p0":0,"t1":"Germany","p1":3,"t2":"England","p2":1,"t3":"Ukraine","p3":0,"t4":"Wales","p4":6,"t5":"Austria","p5":0,"pp":10},{"id":20,"name":"Eddie Lau #2","t0":"Belgium","p0":0,"t1":"Germany","p1":3,"t2":"England","p2":1,"t3":"Ukraine","p3":0,"t4":"N_Ireland","p4":0,"t5":"Austria","p5":0,"pp":4},{"id":21,"name":"Eddie Lau #3","t0":"England","p0":2,"t1":"Belgium","p1":0,"t2":"Switzerland","p2":4,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Germany","p5":3,"pp":20},{"id":22,"name":"Ray Leung","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"Portugal","p2":0,"t3":"Turkey","p3":0,"t4":"Wales","p4":6,"t5":"England","p5":1,"pp":16},{"id":23,"name":"Kevin Luo #1","t0":"France","p0":6,"t1":"Belgium","p1":0,"t2":"England","p2":1,"t3":"Turkey","p3":0,"t4":"Wales","p4":6,"t5":"Spain","p5":3,"pp":16},{"id":24,"name":"Kevin Luo #2","t0":"Belgium","p0":0,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Croatia","p3":5,"t4":"Czech","p4":0,"t5":"England","p5":1,"pp":13},{"id":25,"name":"Kevin Luo #3","t0":"England","p0":2,"t1":"France","p1":3,"t2":"Italy","p2":4,"t3":"Turkey","p3":0,"t4":"Wales","p4":6,"t5":"Germany","p5":3,"pp":18},{"id":26,"name":"Kevin Luo #4","t0":"Germany","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Turkey","p3":0,"t4":"Czech","p4":0,"t5":"France","p5":3,"pp":13},{"id":27,"name":"Abby Mak","t0":"Germany","p0":6,"t1":"Belgium","p1":0,"t2":"Italy","p2":4,"t3":"Ukraine","p3":0,"t4":"Sweden","p4":2,"t5":"Spain","p5":3,"pp":15},{"id":28,"name":"Gary Chu #1","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"Portugal","p2":0,"t3":"Hungary","p3":0,"t4":"Sweden","p4":2,"t5":"England","p5":1,"pp":12},{"id":29,"name":"Gary Chu #2","t0":"England","p0":2,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Poland","p3":5,"t4":"Russia","p4":2,"t5":"France","p5":3,"pp":19},{"id":30,"name":"Gary Chu #3","t0":"Germany","p0":6,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Romania","p3":0,"t4":"Sweden","p4":2,"t5":"Belgium","p5":0,"pp":12},{"id":31,"name":"Gary Chu #4","t0":"England","p0":2,"t1":"Belgium","p1":0,"t2":"Italy","p2":4,"t3":"Poland","p3":5,"t4":"Slovakia","p4":0,"t5":"Germany","p5":3,"pp":14},{"id":32,"name":"Tze Fai Chong #1","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"Portugal","p2":0,"t3":"Poland","p3":5,"t4":"Sweden","p4":2,"t5":"Russia","p5":2,"pp":18},{"id":33,"name":"Tze Fai Chong #2","t0":"Spain","p0":6,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Turkey","p3":0,"t4":"Russia","p4":2,"t5":"France","p5":3,"pp":18},{"id":34,"name":"Kit Chang #1","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"Portugal","p2":0,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"England","p5":1,"pp":21},{"id":35,"name":"Kit Chang #2","t0":"Germany","p0":6,"t1":"France","p1":3,"t2":"England","p2":1,"t3":"Croatia","p3":5,"t4":"Russia","p4":2,"t5":"Portugal","p5":0,"pp":17},{"id":36,"name":"Wilton Lee","t0":"Germany","p0":6,"t1":"Belgium","p1":0,"t2":"Portugal","p2":0,"t3":"Turkey","p3":0,"t4":"Slovakia","p4":0,"t5":"Spain","p5":3,"pp":9},{"id":37,"name":"Frankie Tong","t0":"France","p0":6,"t1":"Germany","p1":3,"t2":"Portugal","p2":0,"t3":"Ukraine","p3":0,"t4":"Russia","p4":2,"t5":"Belgium","p5":0,"pp":11},{"id":38,"name":"Alan Ng","t0":"England","p0":2,"t1":"Germany","p1":3,"t2":"Italy","p2":4,"t3":"Turkey","p3":0,"t4":"Russia","p4":2,"t5":"Belgium","p5":0,"pp":11},{"id":39,"name":"On","t0":"Spain","p0":6,"t1":"Germany","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Belgium","p5":0,"pp":21},{"id":40,"name":"Wilson","t0":"Belgium","p0":0,"t1":"Spain","p1":3,"t2":"England","p2":1,"t3":"Poland","p3":5,"t4":"Wales","p4":6,"t5":"Germany","p5":3,"pp":18}]';
	
epool.teams = {};
epool.policy = {};
epool.matches = {};
epool.entries = [];
epool.entry = {
	id: 0,
	name: "",
	t0: "",
	p0: 0,
	t1: "",
	p1: 0,
	t2: "",
	p2: 0,
	t3: "",
	p3: 0,
	t4: "",
	p4: 0,
	t5: "",
	p5: 0,
	pp: 0
}
epool.currentId = 0;
epool.nextId = epool.entries.length;

epool.maxPoint = 0;

epool.init = function () {
	epool.teams = JSON.parse(teamsJson);
	epool.policy = JSON.parse(policyJson);
	//epool.loadData('./data/matches.json');
	epool.matches = JSON.parse(matchesJson);
};

epool.loadData = function($url) {
	$.ajax({
      url: $url,
      dataType: 'json',
      cache: true,
      async: true,      // avoid XMLHttpRequest request within the main thread
      success: function(data) {
        epool.matches = data;
      },
      error: function(xhr, status, err) {
        console.error($url, status, err.toString());
      }
    });
}

epool.calc = function(team) {
	var point = 0;
	var category = epool.categoryOfTeam(team);
	
	if (!category) {
		console.error(team + " is not in EURO 2016");
		return false;
	}
	
	for (var i = 0; i < epool.matches.length; i++) { 
		if (team === epool.matches[i].teamName) {
			if (epool.matches[i].result === 'w') 
				point += epool.policy[category-1].policy[epool.matches[i].round].point.w;
			else if (epool.matches[i].result === 't') 
				point += epool.policy[category-1].policy[epool.matches[i].round].point.t;
				
			if (epool.matches[i].score >= 3) point++;
		}
	}
	
	return point;
}

epool.categoryOfTeam = function(team) {
	for (var i = 0; i < epool.teams.length; i++) { 
		for (var j = 0; j < epool.teams[i].teams.length; j++) {
			if (team === epool.teams[i].teams[j].name) {
				return epool.teams[i].category;
			}
		}
	}
	return false;
}

epool.setLocalStorage = function(entries) {
	localStorage.setItem("entriesJson", JSON.stringify(entries));
}

epool.removeLocalStorage = function() {
	localStorage.removeItem("entriesJson");
}

epool.setEntryValue = function() {
	epool.entry.t0 = $('#sel-cat0').val();
	epool.entry.t1 = $('#sel-cat1').val();
	epool.entry.t2 = $('#sel-cat2').val();
	epool.entry.t3 = $('#sel-cat3').val();
	epool.entry.t4 = $('#sel-cat4').val();
	epool.entry.t5 = $('#sel-cat5').val();
	
	epool.entry.p0 = epool.calc(epool.entry.t0) * 2;
	epool.entry.p1 = epool.calc(epool.entry.t1);
	epool.entry.p2 = epool.calc(epool.entry.t2);
	epool.entry.p3 = epool.calc(epool.entry.t3);
	epool.entry.p4 = epool.calc(epool.entry.t4);
	epool.entry.p5 = epool.calc(epool.entry.t5);
	epool.entry.pp = epool.entry.p0 + epool.entry.p1 + epool.entry.p2 + epool.entry.p3 + epool.entry.p4 + epool.entry.p5;
	    	
	$('#stPoint').val(epool.entry.p0);
	$('#cat1Point').val(epool.entry.p1);
	$('#cat2Point').val(epool.entry.p2);
	$('#cat3Point').val(epool.entry.p3);
	$('#cat4Point').val(epool.entry.p4);
	$('#atPoint').val(epool.entry.p5);
	$('#totalPoint').val(epool.entry.pp);
}

epool.updateCurrentEntryFromBuffer = function(i) {
	epool.entries[i].t0 = epool.entry.t0;
	epool.entries[i].t1 = epool.entry.t1;
	epool.entries[i].t2 = epool.entry.t2;
	epool.entries[i].t3 = epool.entry.t3;
	epool.entries[i].t4 = epool.entry.t4;
	epool.entries[i].t5 = epool.entry.t5;
	
	epool.entries[i].p0 = epool.entry.p0;
	epool.entries[i].p1 = epool.entry.p1;
	epool.entries[i].p2 = epool.entry.p2;
	epool.entries[i].p3 = epool.entry.p3;
	epool.entries[i].p4 = epool.entry.p4;
	epool.entries[i].p5 = epool.entry.p5;
	epool.entries[i].pp = epool.entry.pp;
}

epool.resetEntry = function() {
	epool.entry.id = 0;
	epool.entry.name = "";
	epool.entry.t0 = "";
	epool.entry.p0 = 0;
	epool.entry.t1 = "";
	epool.entry.p1 = 0;
	epool.entry.t2 = "";
	epool.entry.p2 = 0;
	epool.entry.t3 = "";
	epool.entry.p3 = 0;
	epool.entry.t4 = "";
	epool.entry.p4 = 0;
	epool.entry.t5 = "";
	epool.entry.p5 = 0;
	epool.entry.pp = 0;
}

epool.setSelectOptions = function(entry) {
	$('#sel-cat0').val(entry.t0);
	$('#sel-cat1').val(entry.t1);
	$('#sel-cat2').val(entry.t2);
	$('#sel-cat3').val(entry.t3);
	$('#sel-cat4').val(entry.t4);
	$('#sel-cat5').val(entry.t5);
}

epool.resetSelectOptions = function() {
	$('#sel-cat0').val('ZZ');
	$('#sel-cat1').val('ZZ');
	$('#sel-cat2').val('ZZ');
	$('#sel-cat3').val('ZZ');
	$('#sel-cat4').val('ZZ');
	$('#sel-cat5').val('ZZ');
}

epool.isEntryExist = function(name) {
	for (var i = 0; i < epool.entries.length; i++) {
		if (name === epool.entries[i].name) return true;
	}
	return false;
}

epool.getMaxPoint = function() {
	for (var i = 0; i < epool.entries.length; i++) {
		if (epool.entries[i].pp > epool.maxPoint) 
			epool.maxPoint = epool.entries[i].pp;
	}
	$('#btnRank > span.badge').text(epool.maxPoint);
}

epool.updateAllEntriesValue = function() {
	for (var i = 0; i < epool.entries.length; i++) {
		epool.setSelectOptions(epool.entries[i]);
		epool.setEntryValue();
		epool.updateCurrentEntryFromBuffer(i);
	}
}

epool.quickSort = function (key, items, left, right) {
    var index;

    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        index = partition(key, items, left, right);

        if (left < index - 1) {
            epool.quickSort(key, items, left, index - 1);
        }

        if (index < right) {
            epool.quickSort(key, items, index, right);
        }
    }

    function swap(items, firstIndex, secondIndex) {
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

    function partition(key, items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        while (i <= j) {
            while (items[i][key] < pivot[key]) {
                i++;
            }

            while (items[j][key] > pivot[key]) {
                j--;
            }

            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }

        return i;
    }

    return items;
}

epool.renderEntrieSelection = function(entriesObj) {
	var s = $("#sel-entry");
	s.empty();
	for (var i = 0; i < entriesObj.length; i++) {	
		s.append($('<option>', {
            value: entriesObj[i].id,
            text:  (entriesObj[i].id + 1) + " -- " + entriesObj[i].name + "  (" + entriesObj[i].pp + ")"
        }));
	};
}

epool.updateIDinEntries = function() {
	for (var i = 0; i < epool.entries.length; i++) {	
		epool.entries[i].id = i;
	};
}

epool.rank = function() {
	// update all entries' value
	epool.updateAllEntriesValue();
	// sort 
	epool.quickSort("pp", epool.entries);
	// reverse as descending order
	epool.entries.reverse();
	epool.updateIDinEntries();
	// load entries to selection's options
	epool.renderEntrieSelection(epool.entries);
	// save entries object to local storage    		
	epool.setLocalStorage(epool.entries);
	
	// point to the first entry
	epool.setSelectOptions(epool.entries[0]);
	$("#sel-entry").trigger('change'); 
	epool.getMaxPoint();
}

$(document).ready(function () {
    epool.init();
    
    $('#btnCalc').on('click', function() {
    	epool.setEntryValue();
    	
    	//epool.setLocalStorage(epool.entry);
    });
    
    $('#btnReset').on('click', function() {
    	epool.resetSelectOptions();
    });
    
    $('#btnSave').on('click', function() {
    	var name = $('#inputEntryName').val().trim();
    	if (name !== "" && epool.isEntryExist(name) !== true) {
    		epool.entry.name = name;
    		epool.entry.id = epool.nextId;
    		epool.setEntryValue();		// set buffer entry's value
    		var newEntry = $.extend(true, {}, epool.entry);
    		epool.entries.push(newEntry);
    		
    		epool.nextId = epool.entries.length;
    		epool.currentId = epool.nextId - 1;
    		
    		// update Local Storage
    		epool.setLocalStorage(epool.entries);	
    		
    		// update entry selection's option
    		$("#sel-entry").append($('<option>', {
                value: epool.entries[epool.currentId].id,
                text: epool.entries[epool.currentId].name
            }));
            
            // point to new entry
            $("#sel-entry").val(epool.currentId);
            
            Materialize.toast('entry of "' + epool.entries[epool.currentId].name + '" Saved', 3000);
    	}
    	else {
    		if (name === "")
    			Materialize.toast('A name of the entry is required', 2500);
    		else if (epool.isEntryExist(name) === true)
    			Materialize.toast('An entry with same name is alreay exist', 2500);
    	}
    });
    
    $('#btnDele').on('click', function() {
    	if (epool.entries.length > 0) {
    		var arrDeletedEntries = epool.entries.splice(epool.currentId, 1);
    		
    		if (epool.entries.length !== 0) {
	    		if (parseInt(epool.currentId) === epool.entries.length) 
	    			epool.currentId = epool.currentId - 1 ;	// if deleted the last one, offset -1
	    		else {
		    		for (var i = epool.currentId; i < epool.entries.length; i++) {
		    			epool.entries[i].id = i;	
		    		}
	    		}
	    		
	    		// refresh the entry selection's options
	    		var s = $("#sel-entry");
	    		s.empty();
	    		for (var i = 0; i < epool.entries.length; i++) {
	    			s.append($('<option>', {
		                value: epool.entries[i].id,
		                text:  epool.entries[i].name
		            }));	
	    		}
	    		
	    		// point to current entry
	    		$('#sel-entry').val(epool.currentId);
	    		$('#sel-entry').trigger('change');
	    	}
	    	else {
	    		$("#sel-entry").empty();
	    		$("#sel-entry").val('');
	    		epool.nextId = 0;
	    		epool.removeLocalStorage();
	    	}
	    	
	    	Materialize.toast('entry of "' + arrDeletedEntries[0].name + '" Deleted', 3000);
    	}
    	else
    		Materialize.toast('You don\'t save any entry yet', 2500);
    });
    
    $('#btnRank').on('click', function() {
    	epool.rank();
    	//Materialize.toast('The function is in developing, it will be released in next version', 2500);
    });
    
    var entriesObj = {};
    if (localStorage.getItem("entriesJson"))
		entriesObj = JSON.parse(localStorage.getItem("entriesJson"));
	else
		entriesObj = JSON.parse(allEntriesJson);

	for (var i = 0; i < entriesObj.length; i++) {
		epool.entries.push(entriesObj[i]);
	}
	epool.currentId = 0;
	epool.nextId = epool.entries.length;

	//setTimeout(function () { 	// defer to calc wait for matches data loading
		// update all entries' value
		epool.updateAllEntriesValue();
		// sort 
		epool.quickSort("pp", epool.entries);
		// reverse as descending order
		epool.entries.reverse();
		epool.updateIDinEntries();
		// load entries to selection's options
		epool.renderEntrieSelection(epool.entries);
		// save entries object to local storage    		
		epool.setLocalStorage(epool.entries);
		
		// add changeListener to selection element
		$("#sel-entry").on('change', function() {
    		epool.currentId = $(this).val();
    		epool.setSelectOptions(epool.entries[epool.currentId]);
    		
    		epool.setEntryValue();
    		epool.updateCurrentEntryFromBuffer(epool.currentId);
    		
    		epool.setLocalStorage(epool.entries);
    	});
		
		// point to the first entry
		epool.setSelectOptions(epool.entries[0]);
		$("#sel-entry").trigger('change'); 
		epool.getMaxPoint(); 
	//}, 600);
/*
	// promise load matches data done
	$.getJSON('./data/matches.json').success(function(data) {
		epool.matches = data;	
    }).then(
        function () {
            // update all entries' value
			epool.updateAllEntriesValue();
			// sort 
			epool.quickSort("pp", epool.entries);
			// reverse as descending order
			epool.entries.reverse();
			epool.updateIDinEntries();
			// load entries to selection's options
			epool.renderEntrieSelection(epool.entries);
			// save entries object to local storage    		
			epool.setLocalStorage(epool.entries);
			console.info('then2');
        }
    ).then(
    	function () {			
			// add changeListener to selection element
			$("#sel-entry").on('change', function() {
	    		epool.currentId = $(this).val();
	    		epool.setSelectOptions(epool.entries[epool.currentId]);
	    		
	    		epool.setEntryValue();
	    		epool.updateCurrentEntryFromBuffer(epool.currentId);
	    		
	    		epool.setLocalStorage(epool.entries);
	    	});
			
			// point to the first entry
			epool.setSelectOptions(epool.entries[0]);
			$("#sel-entry").trigger('change'); 
			epool.getMaxPoint(); 
			console.info('then3');
        }
    );
*/
});