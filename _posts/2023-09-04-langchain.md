---
layout: single
title: "Your LLM is an Island. Let's Build Bridges."
date: 2023-09-04 14:30:00 +0200
categories: technical
excerpt: >
  A straightforward guide to LangChain and Gorilla-CLI, the tools that turn your isolated LLM into a fully-integrated powerhouse.
author_profile: true
read_time: true
classes: [wide, full-bleed]
header:
  overlay_image: /assets/images/langchain cover post.jpg
  overlay_filter: 0.5
  caption: "Photo: You're not a genius if you use langchain ;)"
---

# LLMs are not enough

Let's be real. Large Language Models (LLMs) are impressive. They can write, code, and answer questions in a way that feels almost magical. But once the initial novelty wears off, you start to see the limitations. You realize you've been given this incredibly powerful brain, but it's stuck in a jar.

It can't access live information. It can't interact with your other tools. It has no memory of your last conversation. And as Simon Willison so perfectly put it, we've built computers that can lie to us, and we have no idea how to stop them.

> We need to tell people ChatGPT will lie to them, not debate linguistics. — Simon Willison

This is the wall everyone hits. You have this amazing potential, but it's isolated. The real challenge isn't just *using* an LLM; it's *integrating* it into a useful, reliable application. This is where the whole field of "LLMOps" has exploded, and sitting at the center of it is a tool that is fundamentally changing the game: **LangChain**.

# The Toolkit 

**LangChain** isn't just another library. It's a framework designed to connect your LLM to the outside world. The core idea is simple but powerful: you can *chain* different components together to build sophisticated, context-aware applications. It's the glue that lets your LLM talk to APIs, remember past conversations, and make decisions.

Think of it as a set of building blocks:

*   ***Prompt Templates:*** Reusable templates for crafting the perfect prompt, every time.
*   ***LLMs:*** Simple wrappers to connect to any model, from GPT-4 to open-source alternatives.
*   ***Agents:*** The real magic. Agents use an LLM to *think* and decide which tools to use next, whether it's a Google search, a calculator, or a custom API call.
*   ***Memory:*** Giving your application a short-term or long-term memory, so it can have a real conversation.

<figure class="align-center" style="width:75%">
<img src="/assets/images/langchain-workflow.webp" alt="Abstraction of the LangChain workflow">
<figcaption>A simple abstraction of how LangChain connects these components.</figcaption>
</figure>

Let’s break down how these pieces actually work.

## The Building Blocks: Chains

The most fundamental part of LangChain is the `LLMChain`. It's as simple as it sounds: it takes a prompt template, your input, and an LLM, and chains them together.

Let's say you want to generate a name for a restaurant. You start with a prompt template that has a placeholder for the type of food.

```python
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Use a higher temperature for more creative responses
llm = OpenAI(temperature=0.9)

prompt = PromptTemplate(
    input_variables=["type"],
    template="What is a good name for a restaurant that makes {type} food?",
)

# Create the chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run it
print(chain.run("Italian"))
```

This might give you something like *"La Casa Della Pizza"*. Simple, but powerful. You've created a reusable component.

But what if you want to do more? You can link chains together. A `SimpleSequentialChain` takes the output of one chain and feeds it directly into the next. Imagine you want to generate a play title, then write a synopsis for it, and *then* write a review of that synopsis.

It's a pipeline of thought. You create one chain to write the synopsis and a second to write the review.

```python
# First chain: Generate a synopsis from a title
synopsis_template = """You are a playwright. Given the title of a play, write a synopsis.
Title: {title}
Synopsis:"""
synopsis_prompt = PromptTemplate(input_variables=["title"], template=synopsis_template)
synopsis_chain = LLMChain(llm=llm, prompt=synopsis_prompt)

# Second chain: Write a review from a synopsis
review_template = """You are a play critic for the New York Times. Given the synopsis of a play, write a review.
Synopsis:
{synopsis}
Review:"""
review_prompt = PromptTemplate(input_variables=["synopsis"], template=review_template)
review_chain = LLMChain(llm=llm, prompt=review_prompt)
```

Then you wrap them in a `SimpleSequentialChain` and let it run.

```python
from langchain.chains import SimpleSequentialChain

overall_chain = SimpleSequentialChain(chains=[synopsis_chain, review_chain], verbose=True)
review = overall_chain.run("Tragedy at Sunset on the Beach")
```

The `verbose=True` flag shows you the magic as it happens. You'll see the output from the first chain (the synopsis) being passed as the input to the second chain, which then generates the final review. You've just automated a creative workflow.

## Giving Your LLM Arms and Legs: Agents

Chains are great for predefined workflows, but what if you don't know the steps in advance? This is where **Agents** come in. An agent uses an LLM as a reasoning engine to decide what to do. You give it a set of tools, and it figures out which ones to use to answer your question.

Let's give our agent a Google Search tool (`serpapi`) and a calculator (`llm-math`). Then we'll ask it a question that requires both.

```python
from langchain.agents import load_tools, initialize_agent, AgentType

llm = OpenAI(temperature=0) # We want deterministic reasoning here
tools = load_tools(["serpapi", "llm-math"], llm=llm)

# The ZERO_SHOT_REACT_DESCRIPTION agent is great at reasoning based on tool descriptions
agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

# Let's run it
agent.run("Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?")
```

By setting `verbose=True`, you can watch the agent's thought process. It's fascinating.

> **Thought:** I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
> **Action:** Search
> **Action Input:** "Leo DiCaprio girlfriend"
> **Observation:** Camila Morrone
> **Thought:** I need to find out Camila Morrone's age
> **Action:** Search
> **Action Input:** "Camila Morrone age"
> **Observation:** 25 years
> **Thought:** I need to calculate 25 raised to the 0.43 power
> **Action:** Calculator
> **Action Input:** 25^0.43
> **Observation:** Answer: 3.991298452658078
>
> **Thought:** I now know the final answer
> **Final Answer:** Camila Morrone is Leo DiCaprio's girlfriend and her current age raised to the 0.43 power is 3.991298452658078.

This is the real power. The LLM is no longer just a text generator; it's a decision-maker, orchestrating other tools to achieve a goal.

# Talking to APIs

The most powerful use case for agents is interacting with external APIs. This turns your LLM from a closed-off brain into a tool that can interact with the digital world. You can book restaurants, check the weather, or query your company's internal database, all with natural language.

<figure class="align-center" style="width:75%">
<img src="/assets/images/use case langchain.webp" alt="Abstraction of the LangChain workflow">
<figcaption><a href="https://python.langchain.com/docs/use_cases/apis">Use case: Interacting with an API from the official website of LangChain</a></figcaption>
</figure>

OpenAI's newer models are fine-tuned for something called "Function Calling," where they can generate a JSON object that perfectly matches an API's specification. LangChain makes this incredibly easy.

For example, let's query the Klarna shopping API without writing any complex request code. LangChain has a helper function that reads the API's documentation (its OpenAPI spec) and builds a chain for you.

```python
from langchain.chains.openai_functions.openapi import get_openapi_chain

chain = get_openapi_chain("https://www.klarna.com/us/shopping/public/openai/v0/api-docs/")

# Just ask a question in plain English
response = chain("What are some options for a men's large blue button down shirt")
```

Under the hood, the LLM reads the API docs, understands what endpoints are available, constructs the correct API call based on your prompt, executes it, and gives you back a clean JSON response with a list of shirts. It's that simple.

# Gorilla-CLI

This idea of using LLMs to interact with tools isn't just limited to Python scripts. **Gorilla-CLI** brings this power directly to your terminal. It's a command-line tool that translates your plain English requests into the exact shell commands you need.

No more digging through `man` pages to remember obscure `kubectl` or `gcloud` flags. You just ask for what you want.

After `pip install gorilla-cli`, you can just run it:

`$ gorilla "generate 100 random characters into a file called test.txt"`

It will suggest several possible commands. You use the arrow keys to select the best one and hit enter to execute it.

> 🦍 Welcome to Gorilla. Use arrows to select
>  » cat /dev/urandom | env LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 100 > test.txt
>    echo $(head /dev/urandom | LC_CTYPE=C tr -dc 'a-zA-Z0-9' | dd bs=100 count=1) > test.txt
>    dd if=/dev/urandom bs=1 count=100 of=test.txt

It's a game-changer for complex APIs like Kubernetes or cloud providers.

`$ gorilla list all my GCP instances`
> » gcloud compute instances list --format="table(name,zone,status)"

`$ gorilla get the image ids of all pods running in all namespaces in kubernetes`
> » kubectl get pods --all-namespaces -o jsonpath="{..imageID}"

The best part? You can even wrap Gorilla-CLI as a custom tool inside a LangChain agent, giving your Python applications the ability to execute complex shell commands safely.

# So, what's the point?

The era of the standalone LLM is over. They are powerful, yes, but their true potential is unlocked only when they are connected to the world around them.

Frameworks like **LangChain** and tools like **Gorilla-CLI** are the bridges that make this connection possible. They are the next layer of abstraction, moving us from simply prompting a model to building intelligent, autonomous systems that can reason, plan, and act. This is how you build applications that feel truly alive.

If you want to see a full application built with these concepts, you can check out my [GitHub repo](https://github.com/Azzedde/QuestionAI/) where I've built a Streamlit app that lets you chat with your own PDF documents and search the web, all powered by LangChain. It’s one thing to read about it; it’s another to see it work.