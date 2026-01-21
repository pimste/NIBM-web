#!/usr/bin/env node

/**
 * Test script to verify middleware changes work correctly
 * Tests bot blocking, rate limiting, and i18n functionality
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Test cases
const tests = [
  {
    name: 'Legitimate browser request should pass',
    url: '/en',
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    expectedStatus: [200, 301, 302],
  },
  {
    name: 'Googlebot should be allowed',
    url: '/en',
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
    expectedStatus: [200, 301, 302],
  },
  {
    name: 'Spam referrer should be blocked',
    url: '/en',
    headers: {
      'user-agent': 'Mozilla/5.0',
      'referer': 'https://mysticforge.top',
    },
    expectedStatus: [403],
  },
  {
    name: 'Curl user agent should be blocked',
    url: '/en',
    headers: {
      'user-agent': 'curl/7.68.0',
    },
    expectedStatus: [403],
  },
  {
    name: 'API route with spam referrer should be blocked',
    url: '/api/contact',
    method: 'POST',
    headers: {
      'user-agent': 'Mozilla/5.0',
      'referer': 'https://neonflux.top',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name: 'Test', email: 'test@test.com', message: 'Test' }),
    expectedStatus: [403],
  },
  {
    name: 'API route without spam referrer should pass bot check',
    url: '/api/health',
    headers: {
      'user-agent': 'curl/7.68.0', // This should pass for API routes
    },
    expectedStatus: [200],
  },
  {
    name: 'Static file should bypass middleware',
    url: '/images/logo-blue.png',
    headers: {},
    expectedStatus: [200, 404], // 404 is ok if file doesn't exist, but shouldn't be 403
  },
];

async function runTest(test) {
  try {
    const url = `${BASE_URL}${test.url}`;
    const options = {
      method: test.method || 'GET',
      headers: test.headers || {},
    };

    if (test.body) {
      options.body = test.body;
    }

    const response = await fetch(url, options);
    const status = response.status;
    const isExpected = test.expectedStatus.includes(status);

    return {
      name: test.name,
      status,
      expected: test.expectedStatus,
      passed: isExpected,
      url: test.url,
    };
  } catch (error) {
    return {
      name: test.name,
      status: 'ERROR',
      error: error.message,
      passed: false,
      url: test.url,
    };
  }
}

async function runAllTests() {
  console.log('🧪 Testing middleware changes...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const results = [];

  for (const test of tests) {
    const result = await runTest(test);
    results.push(result);

    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Status: ${result.status}${result.expected ? ` (expected: ${result.expected.join(' or ')})` : ''}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  }

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  console.log('\n📊 Summary:');
  console.log(`   Passed: ${passed}/${total}`);
  console.log(`   Failed: ${total - passed}/${total}`);

  if (passed === total) {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Please review the results above.');
    process.exit(1);
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ with native fetch support');
  console.error('   Or install node-fetch: npm install node-fetch');
  process.exit(1);
}

runAllTests().catch((error) => {
  console.error('❌ Test runner error:', error);
  process.exit(1);
});
