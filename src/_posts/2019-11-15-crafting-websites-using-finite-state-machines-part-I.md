---
author: Dan Bunea
layout: post
asset-type: post
title: "Crafting web apps using finite state machines - Part 1"
date: 2019-11-15 00:00:00
description: A practical approach to crafting web applications, with the goals of breaking the complexity down (state machines, separation of concerns) and building robustness right into the system (atomicity with rollback).
image:
    src: /assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/controller%20to%20diagram.png
    attribution:

abstract: Crafting web apps using finite state machines, separation of concerns and atomicity.
tags:
- functional programming
- ClojureScript
- finite state machines
- model view controller
---

# Crafting web apps using finite state machines - Part 1


[Code on Gitlab](https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps)

**Table of contents**

- PROBLEM
  * How should we start crafting a web app?
- SOLUTION
  * THEORY
  * Strategy
    + Goals
  * Tactics
    + Patterns
    + Techniques
  * PRACTICE
    + Step 1 Draw the diagram of the UI state machine
    + Step 2: Domain modelling
    + Step 3: Solve the data problem
    + Step 4: Build the UI
  * Goals revised
- Part II - what will be discussed


# PROBLEM: How should we start crafting a web app?

The requirements come, we have some UI mockups and now we need to start developing a web app. What is the first step we need to do?

Let's go back a bit. If this was not a specific web app but rather a generic one, then:

   1. What would our strategy be like?
   2. What would be our goals?
   3. Which steps would we have to do?
   4. Which patterns could help us?
   5. What tactics could we use?

In the following lines I will try to address exactly this questions. We'll start with a little bit of theory, then we'll put it in practice:

<a name="solution"/>

# SOLUTION

## THEORY

## Strategy


We'll have to think a bit strategically and a little bit tactically. For the strategy, what would be our goals:

### Goals

* Break the complexity down (state machines, separation of concerns)
* Build robustness into the system (atomicity with rollback)

Ok, but how can this be done?

Well, we'll do it in 4 Steps:

1. Finite state machine diagram (state/transitions starting from the UI)
2. States (domain modelling for the states)
3. Transitions (TDD the controller)
4. Presentation/UI for the states (TDD the view)

Steps don't need to be sequential, in fact it is recommended to do the last two in parallel.

## Tactics

### Patterns

We will be using a few patterns:

* finite state machines
* separation of concerns using MVC
* atomicity = all or nothing

### Techniques

and a few Techniques:

* TDD - for the non UI
* TDD - for the UI
* Design by contract

## PRACTICE

We'll rebuild the famous TodoMVC web application (even though some people suffer from TodoMVC fatigue), focusing on what we said before.

![todomvc gif]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/todos.gif "TodoMVC")


### Step 1 Draw the diagram of the UI state machine


So let's start with Step 1 - Finite state machine

Our purpose is to create a state diagram with all the states and transitions we think we'll need. This is not an easy step, but it can clarify the entire development process further on. Let's see what can be done.

Actions:

* list
* filter
* add
* check/unckeck
* edit
* delete

From the screens it also look like we'll have the following States:
list (filtered or not)

* add
* edit

and now let's put it in a diagram:

![state diagram]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/state%20diagram.png "State diagram")

Now using this diagram we'll move to step 2 and we'll do the code according to it.

### Step 2: Domain modelling

We will separate the different concerns using the MVC pattern. All the logic will be in the controller, the data in the model and we'll add the presentation later (or someone else could do it in parallel).

Our data will have to be able to represent all the states in the diagram above: list/filter, add and edit

```clojure
;What is a todo?

{:text "todo", :done? true}


;How do we know the status?
;When do we filter?


{:context {:status "list"
          :filter true}
:todos [{:text "todo 1" :done? true}
        {:text "todo 2" :done? false}]}


;What about edit?
;How do we know which do we edit?
;How do we order the todos?

{:context {:status "edit"
          :filter true
          :selected-id 1},
:todos {
        :1 {:id 1, :text "todo 1", :done? true, :time 1}
        :2 {:id 2, :text "todo 2", :done? false, :time 2}
        }}

;Let's carve it in stone:

(require '[clojure.spec.alpha :as s])

;SPEC
(s/def ::status #{"list" "edit" "add"})
(s/def ::filter #(or (false? %) (true? %)))
(s/def ::filter-with-nil #(or (nil? %) (false? %) (true? %)))
(s/def ::selected-id nat-int?)
(s/def ::context (s/keys :req-un [::status] :opt-un [::filter-id ::selected-id]))


(s/def ::id nat-int?)
(s/def ::text string?)
(s/def ::done? boolean?)
(s/def ::time number?)
(s/def ::todo (s/keys :req-un [::id ::text ::done? ::time]))
(s/def ::todos (s/map-of keyword? ::todo))

(defn edit-mode-has-a-valid-selected-id? [state]
  (if (= "edit" (get-in state [:context :status]))
    (some (into #{} (map :id (vals (:todos state)))) [(get-in state [:context :selected-id])])
    true
    ))

(s/def ::model (s/and
                 (s/keys :req-un [::context] :opt-un [::todos])
                 edit-mode-has-a-valid-selected-id?
                 ))

(comment
(s/valid? ::model {:context {:status "edit"
          :filter true
          :selected-id 1}
:todos {
        :1 {:id 1, :text "todo 1", :done? true, :time 1}
        :2 {:id 2, :text "todo 2", :done? false, :time 2}
        }}))
```

### Step 3: Solve the data problem


Now we know how we could represent our states as data in the model, let's test drive the different transitions which will al be functions in the controller. Normally I start with a plan, where I will know what I want to test.

The plan of the tests:

 * [ ] controller-should
 * [ ] initialize-in-list-mode
 * [ ] check&amp;uncheck
 * [ ] delete
 * [ ] toggle-filters
 * [ ] set a filter
 * [ ] remove all filters
 * [ ] set-add-mode
 * [ ] save-a-new-todo
 * [ ] set-list-mode
 * [ ] set-one-for-edit
 * [ ] save-a-changed-todo

Then we'll write the first one:

```clojure
(deftest initialize-in-list-mode
         (is (= {:context {:status "list"} :todos   {}}
                (init!))))
```

which will obviously

Test fails! Good... now we write the code to make it pass:

```clojure
;THE MODEL
(def model (atom {:context {:status "list"}}))


;THE CONTROLLER
(defn commit! [value atom-to-change]
  (reset! atom-to-change value))

(defn init! []
  (-> @model
    (assoc :todos {})
    (assoc-in [:context :status] "list")
    (commit! model)))



;THE TEST
(deftest initialize-in-list-mode
         (is (= {:context {:status "list"} :todos {}}
                (init!))))
```

Any refactorings? No, let's move to the second test and so on until we solve the entire data problem, one test at a time, making sure it fails, then making it pass, then refactoring the code. We end up with this:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/controller%20tests.png "Controller tests")

Solve the data problem (TDD the model/controller) Done!

The code is merged here:
https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/merge_requests/1/diffs

Code:

- [The final code for the controller test](https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/blob/master/test/todomvc/controller_should.cljs)
- [The final code for the controller](https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/blob/master/src/todomvc/controller.cljs)

Now let's have another look again to see the correspondence between the transitions and the controller functions:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/controller%20to%20diagram.png "Controller to functions")

while the data in the model corresponds to:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/model%20to%20diagram.png "Model to diagram")

It is also worth mentioning that we're using the Reagent library, where the model is an atom that is watched for changes. When the atom is changed (in our case by the controller functions, thus the transitions) it will tell the UI to repaint.

### Step 4: Build the UI

We will need now to make sure that our states can be represented on the screen.

For instance when we're in list mode, filtered:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/filtered%20list%20model%20to%20view.png "model to view, filtered mode")

How about edit state:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/edit%20todo%20model%20to%20view.png "mode to view, edit mode")

Now that we know how the data corresponds to the UI, we can move on to doing the actual UI. We'll use react/reagent to break the UI into components:

```
screen_component
	todo_input_component
		text_input_component
	todos_list_component
		todo_list_item
	todos_count_component
	todos_filter_component
```

The final version will be like:

![]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/component%20hierarchy%20and%20UI%20relations.png "component hierarchy")

Then we'll test drive the entire UI starting by planning the tests:

* [ ] views_should
* [ ] &nbsp;render-the-main-screen
* [ ]   &nbsp;&nbsp;render all sections
* [ ]   &nbsp;not render main section when no todos
* [ ]  &nbsp;render-input-text-component
* [ ]  &nbsp;use-keys-on-input-text-component
* [ ]   &nbsp;&nbsp;write something and hit enter
* [ ]   &nbsp;&nbsp;hitting enter with no text
* [ ]   &nbsp;&nbsp;hitting esc
* [ ]  &nbsp;render todo input component
* [ ]  &nbsp;add-a-new-todo-when-clicking-enter-or-go-to-list-on-escape
* [ ]  &nbsp;render-todos-list-component
* [ ]   &nbsp;&nbsp;no filter
* [ ]   &nbsp;&nbsp;filter active
* [ ]   &nbsp;&nbsp;filter completed
* [ ]  &nbsp;render-todo-item-component
* [ ]   &nbsp;&nbsp;normal mode
* [ ]   &nbsp;&nbsp;completed mode
* [ ]   &nbsp;&nbsp;editing mode
* [ ]  &nbsp;toggle a todo item component
* [ ]  &nbsp;render-todos-count-component
* [ ]   &nbsp;&nbsp;no item left
* [ ]   &nbsp;&nbsp;1 item left
* [ ]   &nbsp;&nbsp;2 items left
* [ ]  &nbsp;render-todos-filters-component
* [ ]   &nbsp;&nbsp;render no filter
* [ ]   &nbsp;&nbsp;render filter active
* [ ]   &nbsp;&nbsp;render filter completed
* [ ]  &nbsp;invoke-controller-filter-when-clicking-filters-in-todos-filters-component

It is worth mentioning that TDD-ing the UI can be split into two types of tests:
- render tests and
- interaction tests

For the render tests you send some data to your components, render it then check how it's rendered.
We start with a render test (we'll use enzyme):

```clojure
(deftest render-the-main-screen
  (testing "render all sections"
    (let [component [views/screen-component data/one-todo-list-mode-no-filter]
          mounted (->> (r/as-element component)
                       (.mount js/enzyme))]
      (is (= 1 (-> mounted (.find ".header") .-length)))
      (is (= 1 (-> mounted (.find ".main") .-length)))
      (is (= 1 (-> mounted (.find ".footer") .-length)))
      (is (= 1 (-> mounted (.find "li.todo") .-length)))
      (is (= "0 items left" (-> mounted (.find "strong") .getDOMNode .-innerText)))
      )))
```

the test fails, so then we start writing our first component, making it pass, refactoring etc.

For the interaction tests, you render some data, then click a button and make sure the mocked function that should be invoked is actually invoked:

```clojure
(deftest invoke-controller-filter-when-clicking-filters-in-todos-filters-component
  (let [invocations (atom [])
        component [views/todos-filters-component nil]
        mounted (->> (r/as-element component)
                     (.mount js/enzyme))]
    (with-redefs [controller/filter! #(swap! invocations conj [%])]
                 (testing "unfilter"
                   (reset! invocations [])
                   (-> mounted
                       (.find "#all")
                       (.simulate "click"))
                   (is (= [[nil]] @invocations)))
                )))
```

The code is merged here:
https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/merge_requests/2/diffs

Code:

- [The final code for the views tests](https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/blob/master/test/todomvc/views_should.cljs)
- [The final code for the views](https://gitlab.com/danbunea/how-to-solve-it-crafting-web-apps/blob/master/src/todomvc/views.cljs)

![view tests]({{site.baseurl}}/assets/custom/img/blog/2019-11-15-crafting-websites-using-finite-state-machines-part-I/crafting/view%20tests.png "View tests")


## Goals revised


The complexity problem -solved by making a state machine and using separation of concerns.

## Parth II - what remains to be discussed

The Robustness problem - TDD is a clear step forward but we can go further:

* add atomicity into the transitions/operations (all or nothing)
* design by contract, always making sure the states are valid states

But that will follow in part II.

