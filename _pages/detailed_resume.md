---
layout: single
title: "Detailed Resume"
permalink: /resume/
nav_order: 2
thumbnail: /assets/images/resume-hero.jpg
page_css:
  - /assets/css/resume-timeline.css

---


## Academic Journey

{% include timeline.html items=site.data.resume.timeline %}

## Professional Experience

{% include feature_row type="full" items=site.data.resume.experience %}

### 🏢 **NAMLA** (Jun '23 - Dec '23) – MLOps and LLMs Intern 
<img src="/assets/images/icon-namla.svg" alt="Namla logo">


#### 🧠 Project 1: Shoplifting Detection System

Designed and developed an **end-to-end real-time shoplifting detection system** using a 3D CNN model, optimized with **OpenVINO** for edge deployment.

* Built the backend and real-time frontend dashboard using **Python**, **React**, **sockets**, and **Docker**.
* Deployed the model via **NVIDIA Triton Inference Server**, leveraging parallel processing for efficient inference.
* Focused on design-system principles for scalable deployment in smart retail contexts.
  📄 [Technical Report](https://nebulous-join-9f9.notion.site/Technical-Report-on-Shoplifting-cd59aa32a4074377978bfd5e02c81746?pvs=4) | [Blog Post](https://nebulous-join-9f9.notion.site/Technical-Blog-Post-caf0ce3bb6704950bb05a4a89f064f72)

#### 🤖 Project 2: LLM-Powered Assistant for DevOps

Contributed to the development of a **LangChain-based intelligent assistant** designed to help Namla’s technical team handle complex tasks via natural language.

* Integrated **open-source LLMs** using **Gorilla-CLI** and customized chains for tailored functionality.
* Monitored and evaluated assistant performance using **Prometheus** and **Grafana**.
* Demonstrated expertise in **LLMs**, **LangChain**, and applied **MLOps** for intelligent system orchestration.
  📄 [LangChain Insights](https://nebulous-join-9f9.notion.site/LangChain-Insights-b46c34f0cc814b61acb91ef34f496234?pvs=4) | [Digest on LLMs](https://nebulous-join-9f9.notion.site/Digest-A-summarized-background-for-LLMs-effb4da65d73434f850cc9daa734ee35)

----

### EURECOM (Jan '24 – Jun '24) – Research Intern (Final Year Engineering Project)
{: .text-left}
<img src="/assets/images/icon-eurecom.svg" alt="EURECOM logo">
#### 🧪 Project: Fine-Tuning Domain-Specific LLMs for 5G Networks

Led the full lifecycle of an applied research project that bridges **telecommunications and generative AI**, culminating in a **published paper** and an **open-source pipeline**.


#### 🔧 **5G Instruct Forge: Data Engineering Pipeline for LLM Fine-Tuning**

Designed and implemented a full-stack solution to generate structured training and evaluation datasets from unstructured 3GPP technical documents.

* Created **5G-specific INSTRUCT datasets** from 22+ 3GPP specifications using custom text-processing pipelines and Python automation.
* Authored and released an **open-source pipeline** capable of producing large-scale, instruction-tuned datasets for **fine-tuning open-source LLMs**.
* Employed **Python**, `python-docx`, **shell scripts**, **Hugging Face**, and integrated **OpenAI**/**Ollama** APIs for dataset generation.
  📂 [GitLab – 5G Instruct Forge](https://gitlab.eurecom.fr/netsoft/5g-instruct-forge) | 🤗 [Hugging Face](https://huggingface.co/Netsoft)


#### 🧠 **Training and Evaluation of 5G-Aware LLMs**

* Fine-tuned multiple **open-source LLMs** on domain-specific datasets using **instruction-tuning**, demonstrating superior performance on 5G-specific reasoning tasks compared to GPT-4.
* Conducted a **comprehensive evaluation** benchmark with custom tasks extracted from 3GPP, creating a solid framework for future telecom-specific LLM research.


#### 📚 **Research & Presentation**

* Conducted a **literature review** covering domain adaptation of LLMs, instruction tuning, and 5G/6G text sources.
* Co-authored a peer-reviewed research paper, published in IEEE Transactions on Cognitive Communications and Networking, presenting the full methodology, pipeline, and experimental results.
* Delivered a **final thesis defense** showcasing the scientific and technical contributions of the project.
  📄 [IEEE Paper: 5G Instruct Forge](https://ieeexplore.ieee.org/document/10794684)




### ⚡ EDF R\&D Labs (Oct '24 – Present) - LLM Engineer 
{: .text-left}
<img src="/assets/images/icon-edf.svg" alt="EDF R&D logo">

#### 🤖 LLM & RAG-based Conversational Agents

* Developed **domain-specific chatbots** using **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)** to assist internal teams with natural language queries over complex technical documents.
* Integrated and tested both **proprietary** and **open-source LLMs**, ensuring they could process and reason over enterprise data.

#### 🧪 Evaluation of Multimodal Generative AI Systems

* Benchmarked **state-of-the-art multimodal AI systems** for tasks such as document information extraction and summarization.
* Defined use-case-specific evaluation criteria to assess performance and suitability for internal deployment.

#### 🧠 Research, Prototyping & Fine-Tuning

* Conducted **literature reviews** and **technological watch** on generative AI trends throughout the year.
* Fine-tuned LLMs for EDF-specific use cases when needed and contributed to internal tools for automating benchmarking and report generation.


## Club & Teaching Leadership

- **School of AI Algiers** – Technical Lead; delivered 7 public workshops from ML basics to LLM Ops
- **Workshop Highlights**:
  - "Build GPT from Scratch" in Darija → transformer deep dive
  - "MLOps" → Docker, Prometheus/Grafana, CI/CD




## Closing Thoughts

{: .notice--primary}
"Every line of code, every paper read, is a step toward horizons unseen. I welcome the hard path, because it shapes the person I aspire to become."
