#! /usr/bin/env zsh

deno test --coverage=cov_profile src/*/*.test.ts
deno coverage cov_profile --lcov --output=cov_profile.lcov
genhtml -o cov_profile/html cov_profile.lcov

chromium cov_profile/html/index.html
