// --- Vegetarian Meal Plans (Indian Veg - No eggs, pure veg) ---
const vegetarianMeals = {
  breakfast: [
    {
      items: ["Poha with peanuts and curry leaves", "A glass of milk or lassi", "Fresh fruits (banana or apple)"],
      calories: 450,
    },
    {
      items: ["Upma with vegetables", "Coconut chutney", "A glass of buttermilk"],
      calories: 420,
    },
    {
      items: ["Idli with sambar", "Coconut chutney", "A glass of filter coffee or tea"],
      calories: 480,
    },
    {
      items: ["Paratha with curd", "Achar (pickle)", "A bowl of fresh fruit salad"],
      calories: 460,
    },
  ],

  lunch: [
    {
      items: ["Dal tadka with brown rice", "Mixed vegetable sabzi", "Cucumber raita", "Chapati (2)"],
      calories: 650,
    },
    {
      items: ["Chole (chickpea curry)", "Jeera rice", "Fresh salad with lemon", "Papad"],
      calories: 620,
    },
    {
      items: ["Palak paneer", "Roti (2)", "Dal fry", "Steamed rice"],
      calories: 680,
    },
    {
      items: ["Rajma curry with rice", "Aloo gobi sabzi", "Fresh curd", "Green salad"],
      calories: 640,
    },
  ],

  snack: [
    {
      items: ["Masala chai with biscuits", "Roasted chana (chickpeas)", "A handful of mixed nuts"],
      calories: 300,
    },
    {
      items: ["Sprouted moong salad", "A bowl of curd", "Fresh seasonal fruit"],
      calories: 280,
    },
    {
      items: ["Dhokla (2 pieces)", "Green chutney", "A glass of buttermilk"],
      calories: 250,
    },
    {
      items: ["Paneer tikka (4-5 pieces)", "Mint chutney", "Carrot and cucumber sticks"],
      calories: 320,
    },
  ],

  dinner: [
    {
      items: ["Mixed dal with jeera rice", "Bhindi masala", "Chapati (2)", "Fresh salad"],
      calories: 600,
    },
    {
      items: ["Paneer butter masala", "Roti (2)", "Dal makhani", "Cucumber raita"],
      calories: 650,
    },
    {
      items: ["Vegetable pulao", "Raita", "Papad", "Mixed vegetable curry"],
      calories: 620,
    },
    {
      items: ["Aloo paratha (2)", "Curd", "Pickle", "Green salad"],
      calories: 630,
    },
  ],
}

// --- Non-Vegetarian Meal Plans ---
const nonVegetarianMeals = {
  breakfast: [
    { items: ["Scrambled eggs with bacon", "Whole wheat toast", "Orange juice"], calories: 480 },
    { items: ["Chicken sausage", "Oatmeal with berries", "Milk"], calories: 450 },
    { items: ["Egg white omelet with ham", "Toast", "Banana"], calories: 420 },
  ],
  lunch: [
    { items: ["Grilled chicken breast", "Brown rice", "Steamed broccoli", "Olive oil"], calories: 700 },
    { items: ["Tuna salad with olive oil", "Whole wheat bread", "Mixed greens"], calories: 620 },
    { items: ["Salmon with sweet potato", "Asparagus", "Lemon butter"], calories: 680 },
  ],
  snack: [
    { items: ["Protein shake with chicken", "Banana"], calories: 320 },
    { items: ["Tuna with crackers", "Cheese"], calories: 300 },
    { items: ["Turkey jerky", "Nuts", "Apple"], calories: 280 },
  ],
  dinner: [
    { items: ["Grilled beef steak", "Sweet potato", "Mixed vegetables", "Olive oil"], calories: 750 },
    { items: ["Baked chicken with herbs", "Quinoa", "Green salad"], calories: 720 },
    { items: ["Fish curry with basmati rice", "Cucumber raita"], calories: 700 },
  ],
}

// -------------------------
// User Data
// -------------------------
let userData = {
  goal: "",
  currentWeight: 0,
  targetWeight: 0,
  height: 0,
  age: 0,
  gender: "",
  activityLevel: 0,
  diet: "",
}

// -------------------------
// Step Navigation
// -------------------------
function nextStep(currentStep) {
  if (currentStep === 1) {
    const goal = document.querySelector('input[name="goal"]:checked')
    if (!goal) {
      alert("Please select your fitness goal")
      return
    }
    userData.goal = goal.value
    document.getElementById("step1").classList.add("d-none")
    document.getElementById("step2").classList.remove("d-none")
  }
}

function previousStep(currentStep) {
  if (currentStep === 2) {
    document.getElementById("step2").classList.add("d-none")
    document.getElementById("step1").classList.remove("d-none")
  }
}

// -------------------------
// BMR + TDEE
// -------------------------
function calculateBMR(weight, height, age, gender) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

function calculateDailyCalories() {
  const bmr = calculateBMR(userData.currentWeight, userData.height, userData.age, userData.gender)
  const tdee = bmr * userData.activityLevel // must be 1.2, 1.375, 1.55, etc.

  if (userData.goal === "gain") return Math.round(tdee + 300)
  else return Math.round(tdee - 300)
}

// Timeline
function calculateTimeline() {
  const difference = Math.abs(userData.targetWeight - userData.currentWeight)
  const caloriesPerKg = 7700
  const dailyChange = 300
  const totalCalories = difference * caloriesPerKg
  const totalDays = Math.round(totalCalories / dailyChange)
  const weeks = Math.round(totalDays / 7)
  const months = Math.round(weeks / 4.3)
  return `${weeks} weeks (approximately ${months} months)`
}

// Macros
function calculateMacros(dailyCalories) {
  const protein = (dailyCalories * 0.3) / 4
  const carbs = (dailyCalories * 0.45) / 4
  const fats = (dailyCalories * 0.25) / 9

  return {
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
  }
}

// -------------------------
// Meal Plan Generator
// -------------------------
function generateMealPlan() {
  const meals = userData.diet === "vegetarian" ? vegetarianMeals : nonVegetarianMeals
  const selected = {}

  Object.keys(meals).forEach((type) => {
    selected[type] = meals[type][Math.floor(Math.random() * meals[type].length)]
  })

  return selected
}

// -------------------------
// Display Results
// -------------------------
function calculateAndShowResults() {
  const form = document.getElementById("weightForm")
  if (!form.checkValidity()) {
    alert("Please complete all required fields")
    return
  }

  const diet = document.querySelector('input[name="diet"]:checked')
  if (!diet) {
    alert("Please choose a diet preference")
    return
  }

  userData.currentWeight = parseFloat(document.getElementById("currentWeight").value)
  userData.targetWeight = parseFloat(document.getElementById("targetWeight").value)
  userData.height = parseFloat(document.getElementById("height").value)
  userData.age = parseFloat(document.getElementById("age").value)
  userData.gender = document.getElementById("gender").value
  userData.activityLevel = parseFloat(document.getElementById("activityLevel").value)
  userData.diet = diet.value

  const dailyCalories = calculateDailyCalories()
  const macros = calculateMacros(dailyCalories)
  const mealPlan = generateMealPlan()
  const timeline = calculateTimeline()

  document.getElementById("calorieGoal").textContent = dailyCalories
  document.getElementById("timeline").textContent = timeline

  document.getElementById("calorieProgress").style.width = Math.min((dailyCalories / 3000) * 100, 100) + "%"

  document.getElementById("protein").textContent = macros.protein + "g"
  document.getElementById("carbs").textContent = macros.carbs + "g"
  document.getElementById("fats").textContent = macros.fats + "g"

  const mealsHTML = Object.entries(mealPlan)
    .map(
      ([type, meal]) => `
        <div class="meal-card">
            <div class="meal-time">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <ul class="meal-items">
                ${meal.items.map((i) => `<li>• ${i}</li>`).join("")}
            </ul>
            <div class="meal-calories">${meal.calories} calories</div>
        </div>
      `,
    )
    .join("")

  document.getElementById("mealsContainer").innerHTML = mealsHTML

  const calculatorSection = document.getElementById("calculator")
  const resultsSection = document.getElementById("results")

  if (calculatorSection) {
    calculatorSection.classList.add("d-none")
  }

  if (resultsSection) {
    resultsSection.classList.remove("d-none")
    setTimeout(() => {
      resultsSection.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  console.log("[v0] Results displayed successfully")
}

// -------------------------
// Reset Everything
// -------------------------
function resetCalculator() {
  document.getElementById("weightForm").reset()
  document.querySelectorAll('input[type="radio"]').forEach((r) => (r.checked = false))

  userData = {
    goal: "",
    currentWeight: 0,
    targetWeight: 0,
    height: 0,
    age: 0,
    gender: "",
    activityLevel: 0,
    diet: "",
  }

  document.getElementById("step1").classList.remove("d-none")
  document.getElementById("step2").classList.add("d-none")

  document.getElementById("calculator").classList.remove("d-none")
  document.getElementById("results").classList.add("d-none")

  document.getElementById("calculator").scrollIntoView({ behavior: "smooth" })
}

// --- Vegetarian Meal Plans (Indian Veg - No eggs, only pure veg) ---
const vegetarianMealsUpdated = {
  breakfast: [
    {
      items: ["Poha with peanuts and curry leaves", "A glass of milk or lassi", "Fresh fruits (banana or apple)"],
      calories: 450,
    },
    {
      items: ["Upma with vegetables", "Coconut chutney", "A glass of buttermilk"],
      calories: 420,
    },
    {
      items: ["Idli with sambar", "Coconut chutney", "A glass of filter coffee or tea"],
      calories: 480,
    },
    {
      items: ["Paratha with curd", "Achar (pickle)", "A bowl of fresh fruit salad"],
      calories: 460,
    },
  ],

  lunch: [
    {
      items: ["Dal tadka with brown rice", "Mixed vegetable sabzi", "Cucumber raita", "Chapati (2)"],
      calories: 650,
    },
    {
      items: ["Chole (chickpea curry)", "Jeera rice", "Fresh salad with lemon", "Papad"],
      calories: 620,
    },
    {
      items: ["Palak paneer", "Roti (2)", "Dal fry", "Steamed rice"],
      calories: 680,
    },
    {
      items: ["Rajma curry with rice", "Aloo gobi sabzi", "Fresh curd", "Green salad"],
      calories: 640,
    },
  ],

  snack: [
    {
      items: ["Masala chai with biscuits", "Roasted chana (chickpeas)", "A handful of mixed nuts"],
      calories: 300,
    },
    {
      items: ["Sprouted moong salad", "A bowl of curd", "Fresh seasonal fruit"],
      calories: 280,
    },
    {
      items: ["Dhokla (2 pieces)", "Green chutney", "A glass of buttermilk"],
      calories: 250,
    },
    {
      items: ["Paneer tikka (4-5 pieces)", "Mint chutney", "Carrot and cucumber sticks"],
      calories: 320,
    },
  ],

  dinner: [
    {
      items: ["Mixed dal with jeera rice", "Bhindi masala", "Chapati (2)", "Fresh salad"],
      calories: 600,
    },
    {
      items: ["Paneer butter masala", "Roti (2)", "Dal makhani", "Cucumber raita"],
      calories: 650,
    },
    {
      items: ["Vegetable pulao", "Raita", "Papad", "Mixed vegetable curry"],
      calories: 620,
    },
    {
      items: ["Aloo paratha (2)", "Curd", "Pickle", "Green salad"],
      calories: 630,
    },
  ],
}

// No need to redeclare vegetarianMeals as it's already defined above
