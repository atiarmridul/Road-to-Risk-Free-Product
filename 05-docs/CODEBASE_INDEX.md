# Repository Structure Index

This repository is a documentation-first QA knowledge base. Markdown files are the primary content, while images and reference documents support selected topics.

## Top-level structure

| Path | Contents |
| --- | --- |
| [`01-testing/`](../01-testing/README.md) | Foundational and modern testing approaches |
| [`02-qa-engineering/`](../02-qa-engineering/README.md) | Advanced QA practices and quality leadership |
| [`03-interview/`](../03-interview/README.md) | Interview preparation and rehearsal material |
| [`04-study-topics/`](../04-study-topics/README.md) | Practical domain-specific study notes |
| [`05-docs/`](README.md) | Navigation and repository documentation |
| [`06-automation/`](../06-automation/README.md) | Test automation and programming notes |
| [`07-resources/`](../07-resources/README.md) | External PDF and document references |

## Content model

```text
section/
├── README.md                  # section navigation
├── topic.md                   # compact topic, when no assets are needed
└── topic-name/                # larger topic with supporting files
    ├── topic-name.md
    └── assets/
```

Some older topics use a directory even when they currently contain only one file. Preserve those paths unless a move provides clear value, because other notes may link to them.

## Navigation sources

- [Root README](../README.md): audience, learning path, and section map
- [Interview hub](../03-interview/README.md): time-boxed interview preparation
- [Markdown index](MARKDOWN_INDEX.md): complete human-friendly topic list
- [Resource index](../07-resources/README.md): categorized supporting documents

## Naming rules

- Use lowercase kebab-case for new Markdown files and directories.
- Name a topic file after its directory when the topic has its own folder.
- Store topic-specific images in an adjacent `assets/` directory.
- Keep generated reports, secrets, local editor state, and operating-system files out of version control.
- Update the relevant section README and Markdown index when adding or moving a topic.
