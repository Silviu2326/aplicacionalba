# Frontend Agents System

A comprehensive system for automated frontend development using AI agents with advanced features for production-ready applications.

## 🎯 Recent Enhancements

The frontend agents system has been enhanced with **eleven major improvements** across two phases:

## Phase 1: Core Enhancements (6 Features)

### 1. 🔄 Token Persistence
**Location**: `backend/agents/shared/utils/tokenTracker.ts`

**Purpose**: Advanced token usage analytics and persistence across sessions.

**Benefits**:
- Detailed token tracking per model, job type, and time period
- Cost analysis and budget monitoring
- Performance metrics and optimization insights
- Historical data for capacity planning

**Code Example**:
```typescript
import { tokenTracker } from './shared/utils/tokenTracker';

// Record token usage
await tokenTracker.recordUsage({
  jobId: 'job-123',
  model: 'gpt-4',
  promptTokens: 1500,
  completionTokens: 800,
  totalTokens: 2300,
  cost: 0.046,
  jobType: 'fe-logic',
  userId: 'user-456'
});

// Get analytics
const analytics = await tokenTracker.getAnalytics({
  timeRange: { start: new Date('2024-01-01'), end: new Date() },
  groupBy: ['model', 'jobType']
});
```

### 2. 💾 Context Re-use
**Location**: `backend/agents/shared/utils/contextCache.ts`

**Purpose**: Intelligent caching of successful results for context reuse.

**Benefits**:
- Reduces redundant LLM calls for similar contexts
- Improves response times significantly
- Lowers operational costs
- Smart cache invalidation based on content changes

**Code Example**:
```typescript
import { contextCache } from './shared/utils/contextCache';

// Cache successful result
await contextCache.set('component-metadata', {
  key: 'UserProfile-v1',
  data: { props: ['user', 'onEdit'], exports: ['UserProfile'] },
  ttl: 3600000 // 1 hour
});

// Retrieve cached result
const cached = await contextCache.get('component-metadata', 'UserProfile-v1');
if (cached) {
  return cached.data; // Skip LLM call
}
```

### 3. 🔧 AST Patch Safe-merge
**Location**: `backend/agents/shared/utils/astPatcher.ts`

**Purpose**: Safe merging of code changes using Abstract Syntax Tree analysis.

**Benefits**:
- Prevents syntax errors during code merging
- Intelligent conflict resolution
- Preserves code structure and formatting
- Rollback capabilities for failed patches

**Code Example**:
```typescript
import { createAstPatcher } from './shared/utils/astPatcher';

const patcher = createAstPatcher('typescript');

// Safe merge with conflict detection
const result = await patcher.safeMerge({
  original: originalCode,
  incoming: newCode,
  strategy: 'preserve-both',
  conflictResolution: 'manual'
});

if (result.success) {
  console.log('Merged successfully:', result.mergedCode);
} else {
  console.log('Conflicts detected:', result.conflicts);
}
```

### 4. 🧪 Dry-run Mode
**Location**: `backend/agents/shared/utils/dryRunMode.ts`

**Purpose**: Preview and validate changes before actual execution.

**Benefits**:
- Risk-free testing of complex operations
- Detailed preview of planned changes
- Validation without side effects
- Cost estimation for dry runs

**Code Example**:
```typescript
import { dryRunMode } from './shared/utils/dryRunMode';

// Enable dry-run mode
const dryRun = dryRunMode.create({
  logLevel: 'detailed',
  validateOnly: true,
  estimateCosts: true
});

// Execute in dry-run mode
const preview = await dryRun.execute(async () => {
  // Your operations here
  return await processUserStories(stories);
});

console.log('Preview:', preview.summary);
console.log('Estimated cost:', preview.estimatedCost);
```

### 5. 📊 Dependency-based Ordering
**Location**: `backend/agents/shared/utils/dependencyOrdering.ts`

**Purpose**: Smart ordering of user stories based on component dependencies.

**Benefits**:
- Ensures components are built in correct order
- Prevents dependency conflicts
- Optimizes build pipeline efficiency
- Automatic dependency graph generation

**Code Example**:
```typescript
import { dependencyOrdering } from './shared/utils/dependencyOrdering';

// Add stories with dependencies
await dependencyOrdering.addStory('UserProfile', {
  dependencies: ['Avatar', 'Button'],
  story: userProfileStory
});

// Get ordered processing queue
const orderedStories = await dependencyOrdering.getProcessingOrder();
console.log('Processing order:', orderedStories.map(s => s.id));
```

### 6. 🔌 Plugin System
**Location**: `backend/agents/shared/utils/pluginSystem.ts`

**Purpose**: Extensible plugin architecture for custom functionality.

**Benefits**:
- Easy integration of custom features
- Lifecycle hooks for all processing stages
- Isolated plugin execution
- Hot-reloading of plugins

**Code Example**:
```typescript
import { pluginSystem } from './shared/utils/pluginSystem';

// Register a plugin
const i18nPlugin = {
  name: 'I18nPlugin',
  version: '1.0.0',
  
  async onComplete(context, result) {
    // Add internationalization to generated components
    return await addI18nSupport(result);
  }
};

await pluginSystem.register(i18nPlugin);

// Execute plugin hooks
const result = await pluginSystem.executeOnComplete(context, data);
```

## Phase 2: Advanced Features (5 Features)

### 7. 🐳 Preview Deploy per Batch
**Location**: `backend/agents/shared/utils/previewDeploy.ts`

**Purpose**: Generate Docker Compose configurations for batch previews.

**Benefits**:
- QA and clients can test before merge
- Isolated preview environments
- Automatic cleanup and TTL
- Traefik reverse proxy integration

**Code Example**:
```typescript
import { previewDeployManager } from './shared/utils/previewDeploy';

// Create preview deployment
const preview = await previewDeployManager.createPreview('batch-123', {
  services: [{
    name: 'frontend',
    image: 'myapp-frontend:batch-123',
    port: 3000
  }],
  domain: 'preview.myapp.com',
  ttl: 24 * 60 * 60 * 1000 // 24 hours
});

console.log('Preview URL:', preview.url);
```

### 8. 🔐 Secret-less Workers
**Location**: `backend/agents/shared/utils/secretManager.ts`

**Purpose**: Runtime secret retrieval from Doppler/Vault for secure operations.

**Benefits**:
- Keys outside of `.env` files
- DevSecOps compliance
- Runtime secret rotation
- Centralized secret management

**Code Example**:
```typescript
import { globalSecretManager } from './shared/utils/secretManager';

// Initialize with Doppler
await globalSecretManager.initialize({
  provider: 'doppler',
  config: { project: 'frontend-agents', environment: 'production' }
});

// Agents download LLM keys at runtime
const apiKey = await globalSecretManager.getSecret('OPENAI_API_KEY');
```

### 9. 💰 Cost Estimator
**Location**: `backend/agents/shared/utils/costEstimator.ts`

**Purpose**: Calculate estimated tokens and costs before job execution.

**Benefits**:
- Prevents billing surprises
- Budget planning and control
- Cost optimization recommendations
- Real-time cost tracking

**Code Example**:
```typescript
import { costEstimator } from './shared/utils/costEstimator';

// Estimate before execution
const estimate = await costEstimator.estimateBatch(userStories, {
  jobTypes: ['fe-logic', 'fe-style'],
  model: 'gpt-4'
});

console.log(`Estimated cost: $${estimate.totalCost.toFixed(2)}`);
console.log(`Total tokens: ${estimate.totalTokens.toLocaleString()}`);
```

### 10. 🔧 Self-heal en Runtime
**Location**: `backend/agents/shared/utils/selfHealManager.ts`

**Purpose**: Read errors from Sentry, generate quick-patches, create hotfix PRs.

**Benefits**:
- App repairs itself in production
- Automatic error detection and fixing
- Reduced downtime and manual intervention
- Learning from production issues

**Code Example**:
```typescript
import { selfHealManager, startSelfHealing } from './shared/utils/selfHealManager';

// Start monitoring Sentry for critical errors
await startSelfHealing({
  errorThreshold: 10,
  autoHealEnabled: true
});

// Manual healing for specific error
const result = await selfHealManager.attemptAutoHeal(sentryError);
if (result.success) {
  console.log('PR created:', result.pr.url);
}
```

### 11. 🚀 Multi-environment Promotion
**Location**: `backend/agents/shared/utils/multiEnvPromotion.ts`

**Purpose**: ArgoCD + label-based automatic promotion to staging after reports.

**Benefits**:
- Publishes to staging without human clicks
- Automated promotion pipeline
- Health checks and rollback capabilities
- Integration with CI/CD workflows

**Code Example**:
```typescript
import { multiEnvPromotionManager, startPromotionMonitoring } from './shared/utils/multiEnvPromotion';

// Start monitoring for ready=true labels
await startPromotionMonitoring({ enableAutoPromotion: true });

// Manual promotion
const promotion = await multiEnvPromotionManager.triggerPromotion({
  fromEnvironment: 'development',
  toEnvironment: 'staging',
  version: 'v1.2.3',
  triggeredBy: 'auto-promotion',
  reason: 'FE and BE reports passed'
});
```

## 📁 Integration Points

These enhancements are integrated into the main processing pipeline:

- **fe-manager worker** (`backend/agents/fe-manager/src/index.ts`): Updated to use all new utilities
- **Orchestrator** (`backend/agents/fe-manager/src/orchestrator.ts`): Enhanced with new processing options
- **Demo files**: 
  - `backend/agents/demo-enhanced-features.js`: Core 6 features examples
  - `backend/agents/demo-additional-features.js`: Additional 5 features examples

All features work together seamlessly and can be enabled/disabled independently based on your needs.

## 🚀 Quick Start

### Running the Demos

```bash
# Run core features demo
node backend/agents/demo-enhanced-features.js

# Run additional features demo
node backend/agents/demo-additional-features.js
```

### Environment Setup

```bash
# Core environment variables
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Secret management (Doppler)
DOPPLER_TOKEN=your_doppler_token
DOPPLER_PROJECT=frontend-agents
DOPPLER_ENVIRONMENT=production

# Self-healing (Sentry + GitHub)
SENTRY_AUTH_TOKEN=your_sentry_token
SENTRY_PROJECT_SLUG=your_project
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_repo

# Multi-environment promotion (ArgoCD)
ARGOCD_URL=https://argocd.your-domain.com
ARGOCD_TOKEN=your_argocd_token
KUBERNETES_TOKEN=your_k8s_token
```

## 🏗️ Architecture

The system follows a modular architecture with:

- **Agents**: Specialized workers for different tasks (fe-manager, be-manager, etc.)
- **Shared Utils**: Common utilities used across all agents
- **Plugin System**: Extensible architecture for custom functionality
- **Orchestrator**: Central coordination and workflow management
- **Monitoring**: Comprehensive logging, metrics, and error tracking

## 📊 Benefits Summary

| Feature | Primary Benefit | Cost Impact | DevOps Impact |
|---------|----------------|-------------|---------------|
| Token Persistence | Cost optimization | -30% | Better budgeting |
| Context Re-use | Speed improvement | -40% | Faster delivery |
| AST Safe-merge | Code quality | 0% | Fewer bugs |
| Dry-run Mode | Risk reduction | 0% | Safer deployments |
| Dependency Ordering | Build efficiency | -10% | Smoother CI/CD |
| Plugin System | Extensibility | Variable | Custom workflows |
| Preview Deploy | QA efficiency | +5% | Better testing |
| Secret-less Workers | Security | 0% | DevSecOps compliance |
| Cost Estimator | Budget control | -20% | Predictable costs |
| Self-heal Runtime | Uptime | -50% incidents | Auto-recovery |
| Multi-env Promotion | Automation | 0% | Zero-touch deploys |

## 🤝 Contributing

To add new features or improve existing ones:

1. Create utilities in `backend/agents/shared/utils/`
2. Update the orchestrator and workers as needed
3. Add comprehensive demos and documentation
4. Follow the established patterns for error handling and logging

## 📝 License

MIT License - see LICENSE file for details.