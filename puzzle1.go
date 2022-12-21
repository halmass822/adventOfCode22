package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	inputFile := os.Args[1]
	file, err := ioutil.ReadFile(inputFile)
	if err != nil {
		fmt.Printf("Readfile error: %s", err)
	}
	puzzleText := string(file)
	elfInventories := strings.Split(puzzleText, "\n\n")

	calorieTotals := []int{0, 5, 4}
	for _, elfInventory := range elfInventories {
		calorieContents := strings.Split(elfInventory, "\n")
		calorieCounter := 0
		for _, calories := range calorieContents {
			caloriesInt, _ := strconv.Atoi(calories)
			calorieCounter += caloriesInt
		}
		calorieTotals = append(calorieTotals, calorieCounter)
	}
	sort.Ints(calorieTotals)
	lastIndex := len(calorieTotals) - 1
	secondLastIndex := lastIndex - 1
	thirdLastIndex := lastIndex - 2
	largestCalorie := calorieTotals[lastIndex]
	top3CalorieSum := largestCalorie + calorieTotals[secondLastIndex] + calorieTotals[thirdLastIndex]

	fmt.Printf("Largest calorie inventory is %d\nSum of the top 3 calorie inventories are %v\n", largestCalorie, top3CalorieSum)
}
