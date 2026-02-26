import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Prayer = {
    id : Nat;
    title : Text;
    text : Text;
    translation : Text;
    category : Text;
  };

  type Ritual = {
    id : Nat;
    title : Text;
    description : Text;
    steps : [Text];
  };

  type ScheduleItem = {
    id : Nat;
    name : Text;
    time : Text;
    description : Text;
  };

  type FavoriteItem = {
    id : Nat;
    itemType : Text;
  };

  let prayers = do {
    let map = Map.empty<Nat, Prayer>();
    map.add(
      1,
      {
        id = 1;
        title = "Ganesh Vandana";
        text = "Vakratunda Mahakaya...";
        translation = "Salutations to Lord Ganesha...";
        category = "Morning";
      },
    );
    map.add(
      2,
      {
        id = 2;
        title = "Gayatri Mantra";
        text = "Om Bhur Bhuvah Swaha...";
        translation = "We meditate upon the spiritual light...";
        category = "General";
      },
    );
    map.add(
      3,
      {
        id = 3;
        title = "Maha Mrityunjaya Mantra";
        text = "Om Tryambakam Yajamahe...";
        translation = "We worship the three-eyed Lord Shiva...";
        category = "Health";
      },
    );
    map.add(
      4,
      {
        id = 4;
        title = "Hanuman Chalisa";
        text = "Shri Guru Charan Saroj Raj...";
        translation = "I clean the mirror of my mind...";
        category = "Evening";
      },
    );
    map.add(
      5,
      {
        id = 5;
        title = "Saraswati Vandana";
        text = "Ya Kundendu Tusharahara Dhavala...";
        translation = "Salutations to Goddess Saraswati...";
        category = "Education";
      },
    );
    map;
  };

  let rituals = do {
    let map = Map.empty<Nat, Ritual>();
    map.add(
      1,
      {
        id = 1;
        title = "Sandhya Vandana";
        description = "Daily ritual performed during dawn, noon, and dusk.";
        steps = ["Prepare sacred space", "Recite mantras", "Offer water to sun"];
      },
    );
    map.add(
      2,
      {
        id = 2;
        title = "Aarti";
        description = "Waving of light in front of deity.";
        steps = ["Light diya", "Sing aarti", "Offer flowers"];
      },
    );
    map.add(
      3,
      {
        id = 3;
        title = "Puja";
        description = "Worship ritual with offerings.";
        steps = ["Clean altar", "Offer flowers and fruits", "Pray and meditate"];
      },
    );
    map;
  };

  let schedule = do {
    let map = Map.empty<Nat, ScheduleItem>();
    map.add(
      1,
      {
        id = 1;
        name = "Morning Puja";
        time = "6:00 AM";
        description = "Daily morning worship";
      },
    );
    map.add(
      2,
      {
        id = 2;
        name = "Sandalwood Offering";
        time = "8:00 AM";
        description = "Apply sandalwood paste to idols";
      },
    );
    map.add(
      3,
      {
        id = 3;
        name = "Water Offering";
        time = "12:00 PM";
        description = "Offer water to sun and tulsi plant";
      },
    );
    map.add(
      4,
      {
        id = 4;
        name = "Evening Aarti";
        time = "6:00 PM";
        description = "Evening worship with lights";
      },
    );
    map.add(
      5,
      {
        id = 5;
        name = "Bedtime Prayer";
        time = "9:00 PM";
        description = "Nighttime gratitude and protection prayers";
      },
    );
    map;
  };

  let prayerCompletions = Map.empty<Principal, Map.Map<Text, List.List<Nat>>>();
  let favorites = Map.empty<Principal, List.List<FavoriteItem>>();

  public query ({ caller }) func getAllPrayers() : async [Prayer] {
    prayers.values().toArray();
  };

  public query ({ caller }) func getPrayersByCategory(category : Text) : async [Prayer] {
    prayers.values().toArray().filter(func(prayer) { prayer.category == category });
  };

  public query ({ caller }) func getAllRituals() : async [Ritual] {
    rituals.values().toArray();
  };

  public query ({ caller }) func getFullSchedule() : async [ScheduleItem] {
    schedule.values().toArray();
  };

  public shared ({ caller }) func markPrayerCompleted(prayerId : Nat, date : Text) : async () {
    if (not prayers.containsKey(prayerId)) {
      Runtime.trap("Prayer does not exist");
    };

    let userCompletions = switch (prayerCompletions.get(caller)) {
      case (null) { Map.empty<Text, List.List<Nat>>() };
      case (?map) { map };
    };

    let dateCompletions = switch (userCompletions.get(date)) {
      case (null) { List.empty<Nat>() };
      case (?list) { list };
    };

    dateCompletions.add(prayerId);
    userCompletions.add(date, dateCompletions);
    prayerCompletions.add(caller, userCompletions);
  };

  public query ({ caller }) func getPrayerCompletionsForDate(date : Text) : async [Nat] {
    switch (prayerCompletions.get(caller)) {
      case (null) { [] };
      case (?userCompletions) {
        switch (userCompletions.get(date)) {
          case (null) { [] };
          case (?dateCompletions) { dateCompletions.toArray() };
        };
      };
    };
  };

  public shared ({ caller }) func addFavorite(itemId : Nat, itemType : Text) : async () {
    let currentFavorites = switch (favorites.get(caller)) {
      case (null) { List.empty<FavoriteItem>() };
      case (?list) { list };
    };
    currentFavorites.add({ id = itemId; itemType });
    favorites.add(caller, currentFavorites);
  };

  public shared ({ caller }) func removeFavorite(itemId : Nat, itemType : Text) : async () {
    switch (favorites.get(caller)) {
      case (null) { Runtime.trap("No favorites found for user.") };
      case (?currentFavorites) {
        let filtered = currentFavorites.filter(
          func(fav) {
            not (fav.id == itemId and fav.itemType == itemType);
          }
        );
        favorites.add(caller, filtered);
      };
    };
  };

  public query ({ caller }) func getFavorites() : async [FavoriteItem] {
    switch (favorites.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };
};
