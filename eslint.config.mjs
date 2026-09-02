import eslint from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'docs/.vitepress/cache/**', 'docs/.vitepress/dist/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: false }
      ],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public', overrides: { constructors: 'off' } }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] },
        {
          selector: 'parameter',
          modifiers: ['unused'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: ['parameter', 'variable'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: ['function', 'method'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-useless-assignment': 'off',
      'no-constant-condition': ['error', { checkLoops: false }]
    }
  },
  {
    files: ['src/**/*.ts'],
    plugins: { jsdoc },
    settings: {
      jsdoc: {
        mode: 'typescript',
        tagNamePreference: { return: 'returns' },
        structuredTags: {
          createDate: {},
          updateDate: {},
          CreateDate: {},
          LastUpdateDate: {}
        }
      }
    },
    rules: {
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
      'jsdoc/tag-lines': ['error', 'never', { startLines: 1 }]
    }
  },
  {
    files: ['tests/consumer/**/*.cjs'],
    languageOptions: {
      globals: {
        require: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
)
