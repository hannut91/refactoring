const { statement } = require('./statement');

describe('statement', () => {
  describe('with tragedy & less then 30 audience', () => {
    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 1,
          "price": 5000
        },
      ]
    };

    const plays = {
      "hamlet": { "name": "Hamlet", "type": "tragedy" },
    }

    it('returns someting', () => {
      const result = statement(invoice, plays);

      expect(result).toContain('BigCo');
      expect(result).toContain('Hamlet : $400.00 (1석)');
      expect(result).toContain('총액: $400.00');
      expect(result).toContain('적립 포인트: 0점');
    });
  });

  describe('with tragedy & more then 30 audience', () => {
    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 31,
          "price": 5000
        },
      ]
    };

    const plays = {
      "hamlet": { "name": "Hamlet", "type": "tragedy" },
    }

    it('returns someting', () => {
      const result = statement(invoice, plays);

      expect(result).toContain('BigCo');
      expect(result).toContain('Hamlet : $410.00 (31석)');
      expect(result).toContain('총액: $410.00');
      expect(result).toContain('적립 포인트: 1점');
    });
  });

  describe('with comedy & less then 20 audience', () => {
    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "as-like",
          "audience": 1,
          "price": 5000
        },
      ]
    };

    const plays = {
      "as-like": { "name": "As You Like It", "type": "comedy" },
    }

    it('returns someting', () => {
      const result = statement(invoice, plays);

      expect(result).toContain('BigCo');
      expect(result).toContain('As You Like It : $303.00 (1석)');
      expect(result).toContain('총액: $303.00');
      expect(result).toContain('적립 포인트: 0점');
    });
  });

  describe('with comedy & more then 20 audience', () => {
    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "as-like",
          "audience": 21,
          "price": 5000
        },
      ]
    };

    const plays = {
      "as-like": { "name": "As You Like It", "type": "comedy" },
    }

    it('returns someting', () => {
      const result = statement(invoice, plays);

      expect(result).toContain('BigCo');
      expect(result).toContain('As You Like It : $468.00 (21석)');
      expect(result).toContain('총액: $468.00');
      expect(result).toContain('적립 포인트: 4점');
    });
  });

  describe('with unknown', () => {
    const invoice = {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "as-like",
          "audience": 1,
          "price": 5000
        },
      ]
    };

    const plays = {
      "as-like": { "name": "As You Like It", "type": "unknown" },
    }

    it('returns Error', () => {
      try {
        statement(invoice, plays);
      } catch (error) {
        expect(error).toEqual(new Error('알 수 없는 장르 : unknown'));
      }
    });
  });
});
