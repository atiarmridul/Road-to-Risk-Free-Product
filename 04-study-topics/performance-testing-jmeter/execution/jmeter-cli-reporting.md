# JMeter Command Line and Reporting

> **Focus:** JMeter Command Line and Reporting explains one specific part of performance engineering and how a QA engineer applies it.


## Why Non-GUI Mode

Use non-GUI mode for actual load tests because GUI mode consumes more resources and can distort results.

## Run Test

```bash
jmeter -n -t test-plan.jmx -l results.jtl
```

## Generate HTML Report

```bash
jmeter -g results.jtl -o html-report
```

## Useful Additions

```bash
jmeter -n -t test-plan.jmx -l results.jtl -e -o html-report
```

- `-e -o` generates HTML report immediately after execution.

## Recommended Execution Practice

1. Keep test scripts in version control.
2. Parameterize env values (base URL, token endpoints, creds).
3. Save JTL per run with timestamp.
4. Archive report + JMX + env info for traceability.
