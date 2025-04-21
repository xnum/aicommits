# 整合 gpt-4o-mini 模型到 aicommits 的計劃

## 背景

aicommits 是一個使用 AI 來自動生成 git commit 訊息的工具。目前，它使用 OpenAI 的 API，預設模型是 "chatgpt-4o-latest"。我們希望將預設模型改為 "gpt-4o-mini"。

## 分析

根據對代碼的分析，我們需要修改以下文件：

1. `src/utils/config.ts` - 修改預設模型

## 具體更改

### 1. 修改 `src/utils/config.ts`

將預設模型從 "chatgpt-4o-latest" 改為 "gpt-4o-mini"。

```diff
// 在 src/utils/config.ts 文件中
model(model?: string) {
  if (!model || model.length === 0) {
-    return 'chatgpt-4o-latest';
+    return 'gpt-4o-mini';
  }

  return model as TiktokenModel;
},
```

## 實施步驟

1. 修改 `src/utils/config.ts` 文件
2. 構建專案 (`pnpm build`)
3. 測試功能
4. 更新文檔
5. 提交更改

## API 兼容性

根據對代碼的分析，aicommits 使用直接的 HTTP 請求與 OpenAI API 通信，而不是使用 SDK。這種實現方式應該與 gpt-4o-mini 模型兼容，因為：

- API 端點相同 (`api.openai.com/v1/chat/completions`)
- 請求格式相同 (使用 `CreateChatCompletionRequest` 類型)
- 響應格式相同 (使用 `CreateChatCompletionResponse` 類型)

不需要修改 `src/utils/openai.ts` 中的代碼。

## 測試

在實施更改後，需要測試工具的功能，確保它能夠正常工作：

1. 使用修改後的代碼生成 commit 訊息
2. 確認 API 請求成功
3. 評估生成的 commit 訊息質量

## 性能和成本影響

gpt-4o-mini 模型相比 gpt-4o 有以下特點：
- 更低的成本
- 可能略低的性能，但對於生成 commit 訊息這樣的任務應該足夠
- 響應速度可能更快

## 後續步驟

完成這些更改後，您可能還想考慮：

1. 更新 README.md 或其他文檔，說明現在使用 gpt-4o-mini 作為預設模型
2. 考慮添加一個配置選項，讓用戶可以更容易地切換不同的模型